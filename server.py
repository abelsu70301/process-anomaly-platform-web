from fastapi import FastAPI, HTTPException  #FastAPI：建立 Web 應用程式;HTTPException：讓API可以回傳404等HTTP錯誤
from fastapi.staticfiles import StaticFiles  #StaticFiles：提供 HTML、CSS、JavaScript 等靜態檔案
from pydantic import BaseModel, Field  #BaseModel：建立資料模型，定義 API 接收的 JSON 資料格式;Field：設定欄位屬性長度等驗證規則

app = FastAPI()  #建立名為 app 的應用程式物件

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

@app.post("/api/analysis/validate")
def validate_analysis(request: AnalysisRequest):  # 後端不能相信前端驗證，因此再次確認副檔名  #request: AnalysisRequest：要求收到的 JSON 符合剛建立的 Pydantic 模型
    if not request.file_name.lower().endswith(".csv"):  #.strip()：Python 版本的去除前後空白
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

app.mount(  #掛載（掛接）一個子應用程式或服務到指定網址路徑
    "/",  #網站根網址
    StaticFiles(directory="site", html=True),  #directory="site"：網頁檔案放在 site 資料夾;html=True：開啟根網址時，自動尋找 index.html
    name="site"  #替這組靜態檔案服務命名
)  #當使用者訪問 / 開頭的網址時，把這些請求交給 StaticFiles 處理