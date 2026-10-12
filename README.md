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

## 專案結構

```text
WEB/
├── css/
│   └── style.css
├── .gitignore
├── README.md
├── ai.md
├── app.js
├── index.html
└── web.md
```

## 本機執行方式

進入 `WEB` 專案資料夾後，執行：

```powershell
python -m http.server 5500
```

接著使用瀏覽器開啟：

```text
http://localhost:5500
```

若要停止伺服器，請在終端機按下 `Ctrl + C`。

## 文件說明

- `README.md`：專案介紹與執行方式
- `web.md`：每週操作與學習紀錄
- `ai.md`：重要的 AI 協作、問題排查與驗證紀錄

## 尚未完成

- 實際讀取與上傳 CSV 資料
- 執行資料品質檢查與異常分析
- 顯示分析結果與可疑因子
- 將分析紀錄保存至資料庫