# 製程異常分析輔助平台

Web Programming 課程實作專案。

## 作者

蘇婉筑

## 專案說明

本專案預計建立一個可以透過瀏覽器操作的製程異常分析輔助平台。

使用者可以上傳製程量測資料，系統將進行資料品質檢查、異常分類、模型評估與可疑因子排序，協助工程師縮小異常排查範圍。

## 目前進度

### W1：Web 基礎與開發環境

- 建立 HTML、CSS 與 JavaScript 檔案
- 建立基本頁面與按鈕互動
- 使用 Python HTTP Server 開啟網頁

### W2：Web UI 與語意化 HTML

- 使用語意化標籤建立頁面結構
- 建立功能選單與頁內導覽
- 建立 CSV 檔案選擇欄位
- 建立工程師備註輸入區
- 將 CSS 移至 `css/style.css`

### W3：FastAPI、Uvicorn 與網站部署

- 建立 Python 虛擬環境
- 安裝 FastAPI、Uvicorn 與 aiofiles
- 建立 `requirements.txt`
- 使用 `site` 資料夾管理前端靜態檔案
- 使用 FastAPI 的 StaticFiles 提供網頁
- 使用 Uvicorn 在 7777 埠啟動網站
- 完成本機、指定埠位及課程公開網址測試

### W4：CSS 版面與 RWD

- 使用 CSS Grid 建立側邊欄與主要內容兩欄版面
- 使用 Flexbox 製作功能選單
- 採用 mobile first 設計
- 使用 media query 支援手機、平板及桌機
- 建立可自動換行的狀態卡片
- 使用 CSS 變數統一管理配色
- 完成深色與淺色模式切換
- 加入頁尾並完成不同螢幕寬度測試

## 專案結構

```text
WEB/
├── site/
│   ├── css/
│   │   └── style.css
│   ├── app.js
│   └── index.html
├── .gitignore
├── README.md
├── ai.md
├── requirements.txt
├── server.py
└── web.md
```

`venv` 為本機虛擬環境，已透過 `.gitignore` 排除，不會上傳至 GitHub。

## 首次安裝

進入 `WEB` 專案資料夾後，建立虛擬環境：

```powershell
python -m venv venv
```

啟動虛擬環境：

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\venv\Scripts\Activate.ps1
```

安裝專案所需套件：

```powershell
python -m pip install -r requirements.txt
```

## 本機執行方式

確認虛擬環境已啟動後，執行：

```powershell
python -m uvicorn server:app --reload --host 0.0.0.0 --port 7777
```

接著使用瀏覽器開啟：

```text
http://localhost:7777/
```

若要停止伺服器，請在終端機按下 `Ctrl + C`。

## 文件說明

- `README.md`：專案介紹、結構與執行方式
- `web.md`：每週操作與學習紀錄
- `ai.md`：重要的 AI 協作、問題排查與驗證紀錄
- `requirements.txt`：Python 套件與版本紀錄

## 尚未完成

- 實際讀取與上傳 CSV 資料
- 執行資料品質檢查與異常分析
- 顯示分析結果與可疑因子
- 將分析紀錄保存至資料庫