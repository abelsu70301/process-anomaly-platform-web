from fastapi import FastAPI, HTTPException, Request, Response, UploadFile, Depends
#FastAPI：建立 Web 應用程式;HTTPException：讓API可以回傳404等HTTP錯誤
#Response：讓後端在 HTTP Response 中設定 Cookie;Request：稍後讀取瀏覽器自動送回的 Cookie
from fastapi.staticfiles import StaticFiles  #StaticFiles：提供 HTML、CSS、JavaScript 等靜態檔案
from pydantic import BaseModel, Field  #BaseModel：建立資料模型，定義 API 接收的 JSON 資料格式;Field：設定欄位屬性長度等驗證規則
import csv
from io import StringIO
from pathlib import Path
from dotenv import load_dotenv
import os
from authlib.integrations.starlette_client import OAuth
from starlette.middleware.sessions import SessionMiddleware
from authlib.integrations.base_client import OAuthError
from httpx import HTTPError
from fastapi.responses import RedirectResponse
import math

load_dotenv(Path(__file__).with_name(".env"))  #指的是「跟 server.py 同一層的 .env」

app = FastAPI()  #建立名為 app 的應用程式物件

app.add_middleware(
    SessionMiddleware,
    secret_key=os.environ["SESSION_SECRET_KEY"],
    session_cookie="process_oauth_session",
    same_site="lax",
    https_only=False,  #只供本機 HTTP 測試：公開 HTTPS 版要改為 True
)

oauth = OAuth()
oauth.register(
    name="google",
    client_id=os.environ["GOOGLE_CLIENT_ID"],
    client_secret=os.environ["GOOGLE_CLIENT_SECRET"],
    server_metadata_url="https://accounts.google.com/.well-known/openid-configuration",
    client_kwargs={"scope": "openid email"},
)

class AnalysisRequest(BaseModel):  #建立名為 AnalysisRequest 的資料模型，繼承自 BaseModel
    file_name: str = Field(min_length=5)  #file_name 欄位，字串型態，最短 5 個字元
    engineer_note: str = Field(default="", max_length=200)  #engineer_note 欄位，字串型態，預設空字串，最長 200 個字元

SUMMARY_DETAILS = {  #三筆資料
    "fileStatus": {
        "title": "資料狀態說明",
        "description": "目前尚未上傳及讀取 csv 資料。"
    },
    "analysisStatus": {
        "title": "分析狀態說明",
        "description": "目前使用公開 API 測試前端請求，尚未執行真正的異常分析。"
    },
    "historyStatus": {
        "title": "歷史紀錄說明",
        "description": "目前尚未連接資料，因此沒有可讀取的分析紀錄。"
    }
}  #使用 dictionary 保存三張卡片各自的詳細說明

@app.get("/api/summary")  # @app.get：建立一個接收 GET Request 的 API  # "/api/summary"：這個 API 的網址路徑
def get_summary():  # get_summary：處理 /api/summary 請求的 Python 函式  # 回傳三張摘要卡片

    return {
        "cards": [
            {
                "element_id": "fileStatus",
                "name": "資料狀態",
                "value": "尚未上傳資料"
            },
            {
                "element_id": "analysisStatus",
                "name": "分析狀態",
                "value": "等待執行分析"
            },
            {
                "element_id": "historyStatus",
                "name": "歷史紀錄",
                "value": "尚未連接歷史紀錄資料"
            }
        ]
    }
    # Python 的 dictionary 會由 FastAPI 自動轉換成 JSON

@app.get("/api/summary/{element_id}")  #{element_id} 是路徑參數，會依請求網址改變
def get_summary_detail(element_id: str):  # element_id: str 表示接收到的 element_id 必須是字串  #回傳被點擊卡片的詳細內容

    detail = SUMMARY_DETAILS.get(element_id)  #使用網址中的 element_id 尋找對應的詳細資料

    if detail is None:  #如果 dictionary 中沒有這個 element_id

        raise HTTPException(
            status_code=404,
            detail="找不到指定的摘要資料"
        )  #回傳 HTTP 404，讓前端知道找不到資料

    return detail  #找到資料時，自動轉換成 JSON

#共用函式
def require_google_login(request: Request):
    if not request.session.get("google_sub"):
        raise HTTPException(status_code=401, detail="請使用 Google 登入")

@app.post("/api/analysis/validate", dependencies=[Depends(require_google_login)])  #Depends(...) 會讓 FastAPI 在執行這兩個端點的函式前先檢查 Session
def validate_analysis(request: AnalysisRequest):  # 後端不能相信前端驗證，因此再次確認副檔名  #request: AnalysisRequest：要求收到的 JSON 符合剛建立的 Pydantic 模型
    if not request.file_name.lower().endswith(".csv"):  #.strip()：Python 版本的去除前後空白;檢查結尾
        raise HTTPException(
            status_code=400,  #資料不符合專案規則時，回傳 400 Bad Request
            detail="檔案格式錯誤，僅接受 CSV 檔案"
        )

    engineer_note = request.engineer_note.strip()  # 備註可以不填；若有內容，至少需要 5 個字元

    if 0 < len(engineer_note) < 5:
        raise HTTPException(
            status_code=400,
            detail="工程師備註若有填寫，至少需要 5 個字元"
        )

    return {  #驗證成功時由 FastAPI 自動轉成 JSON
        "message": "後端驗證成功",
        "file_name": request.file_name,
        "engineer_note": engineer_note
    }

@app.post("/api/session/start")  #建立後端測試 Session Cookie
def start_demo_session(response: Response):
    response.set_cookie(
        key="__Host-process_anomaly_demo_session",  #Cookie 名稱
        value="demo-session-001",  #教學用 Session ID，不是真正登入憑證
        max_age=3600,  #1小時候到期
        path="/",  #整個網站路徑都能使用
        httponly=True,  #禁止 JS 使用 document.cookie 讀取
        secure=True,  #只透過 HTTPS 傳送；localhost 可用來進行本機安全屬性測試
        samesite="lax"  #限制部分跨站請求附帶 Cookie
    )  #__Host-：安全 Cookie 前綴，要求 Secure、`Path=/`，而且不能設定 Domain

    return {"message": "後端測試 Session Cookie 已建立"}

@app.get("/api/session/check")  #瀏覽器自動附上符合條件的 Cookie
def check_demo_session(request: Request):
    session_id = request.cookies.get("__Host-process_anomaly_demo_session")  #從 Brower 傳來的 Cookie 中取得測試 Session ID

    if session_id is None:
        return {"has_session": False, "message": "後端沒有收到 Session Cookie"}

    return {"has_session": True, "message": "後端已收到 Session Cookie", "session_id": session_id}

@app.post("/api/session/logout")
def logout_demo_session(response: Response):
    response.delete_cookie(
        key="__Host-process_anomaly_demo_session",
        path="/",
        secure=True,
        httponly=True,  #前端 JS 不能讀取或是刪除，需呼叫後端 API
        samesite="lax"
    )  ##使用相同名稱、Path 及安全設定，要求瀏覽器刪除 Cookie

    return {"message": "後端測試 Session Cookie 已刪除"}

@app.post("/api/analysis/preview", dependencies=[Depends(require_google_login)])
async def preview_csv(file: UploadFile):
    if not (file.filename or "").lower().endswith(".csv"):
        raise HTTPException(status_code=400, detail="請上傳 CSV 檔案")

    max_bytes = 5 * 1024 *1024
    content = await file.read(max_bytes + 1)  #file.read: 讀到的是檔案內容
    if len(content) > max_bytes:
        raise HTTPException(status_code=413, detail="檔案不可超過 5 MB")

    try:
        text = content.decode("utf-8-sig")
        reader = csv.reader(StringIO(text, newline=""), strict=True)
        columns = next(reader,[])  #把第一列當欄位名稱

        numeric_columns = [
            "Air temperature [K]",
            "Process temperature [K]",
            "Rotational speed [rpm]",
            "Torque [Nm]",
            "Tool wear [min]",
        ]
        label_column = "Machine failure"
        required_columns = numeric_columns + [label_column]

        missing_columns = [name for name in required_columns if name not in columns]
        duplicate_columns = [name for name in required_columns if columns.count(name) > 1]
        column_indexes = {
            name: columns.index(name)
            for name in required_columns
            if columns.count(name) == 1
        }
        issues = {
            name: {"missing": 0, "invalid": 0}
            for name in column_indexes
        }

        row_count = 0
        wrong_width_rows = 0

        for row in reader:
            if not any(cell.strip() for cell in row):
                continue

            row_count +=1

            if len(row) != len(columns):
                wrong_width_rows += 1
                continue

            for name, index in column_indexes.items():
                value = row[index].strip()

                if not value:
                    issues[name]["missing"] += 1
                elif name == label_column:
                    if value not in {"0", "1"}:
                        issues[name]["invalid"] += 1

                else:
                    try:
                        valid_number = math.isfinite(float(value))
                    except ValueError:
                        valid_number = False

                    if not valid_number:
                        issues[name]["invalid"] += 1

    except (UnicodeDecodeError, csv.Error):
        raise HTTPException(status_code=400, detail="無法讀取，請確認是 UTF-8 CSV")

    if not columns or row_count == 0:
        raise HTTPException(status_code=400, detail="CSV 必須包含欄位名稱和至少一筆資料")

    return {
        "columns": columns,
        "row_count": row_count,
        "quality": {
            "missing_columns": missing_columns,
            "duplicate_columns": duplicate_columns,
            "wrong_width_rows": wrong_width_rows,
            "column_issues": issues,
        },
    }

#負責把瀏覽器送去 Google 選帳號，並且公開網址和localhost都可以
@app.get("/auth/google/login")
async def google_login(request: Request, mode: str = "local"):
    if mode == "local":
        redirect_uri = os.environ["GOOGLE_REDIRECT_URI"]
    elif mode == "demo":
        redirect_uri = os.getenv("GOOGLE_DEMO_REDIRECT_URI", "")
        if not redirect_uri:
            raise HTTPException(status_code=503, detail="課程站登入尚未設定")
    else:
        raise HTTPException(status_code=400, detail="不支援的登入模式")

    return await oauth.google.authorize_redirect(request, redirect_uri)

#負責接住選完帳號後的回傳，讓後端驗證身分
@app.get("/auth/google/callback")
async def google_callback(request: Request):
    try:
        token = await oauth.google.authorize_access_token(request)
    except OAuthError:
        raise HTTPException(status_code=400, detail="Google 登入未完成，請從登入入口重試",) from None
    except HTTPError:
        raise HTTPException(status_code=502, detail="目前無法連線到 Google，請稍後重試",) from None

    user_info = token.get("userinfo")
    if not user_info or not user_info.get("sub"):
        raise HTTPException(status_code=400, detail="無法確認 Google 帳號身分")

    allowed_email = os.getenv("GOOGLE_ALLOWED_EMAIL", "").strip().lower()
    allowed_hd = os.getenv("GOOGLE_ALLOWED_HD", "").strip().lower()

    email = (user_info.get("email") or "").strip().lower()
    hosted_domain = (user_info.get("hd") or "").strip().lower()

    if (
        not allowed_email
        or not allowed_hd
        or user_info.get("email_verified") is not True
        or email != allowed_email
        or hosted_domain != allowed_hd
    ):

        raise HTTPException(status_code=403, detail="此 Google 帳號不在名單內")

    request.session.clear()
    request.session["google_sub"] = user_info["sub"]

    return RedirectResponse(
        url="../../#analysis",
        status_code=303,
        headers={"Cache-Control": "no-store", "Referrer-Policy": "no-referrer"},
    )

#查詢登入狀態的 API
@app.get("/api/auth/me")
def get_login_status(request: Request, response: Response):
    response.headers["Cache-Control"] = "no-store"
    return {"logged_in": bool(request.session.get("google_sub"))}

#登出
@app.post("/api/auth/logout")
def logout(request: Request):
    allowed_origins = {
        "http://localhost:7777",
        "https://demo.wke.csie.ncnu.edu.tw",
    }

    if request.headers.get("origin") not in allowed_origins:
        raise HTTPException(status_code=403, detail="不接受其他網站的登出請求")

    request.session.clear()
    return {"message": "已登出網站"}

app.mount(  #掛載（掛接）一個子應用程式或服務到指定網址路徑
    "/",  #網站根網址
    StaticFiles(directory="site", html=True),  #directory="site"：網頁檔案放在 site 資料夾;html=True：開啟根網址時，自動尋找 index.html
    name="site"  #替這組靜態檔案服務命名
)  #當使用者訪問 / 開頭的網址時，把這些請求交給 StaticFiles 處理