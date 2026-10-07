# Web Programming 學習紀錄

## Project Milestone

- [x] W1：建立 Web 專案及基本靜態網頁
- [ ] W2：待完成
- [ ] W3：待完成
- [ ] W4：待完成

---

## W1：Web 基礎與開發環境

### 本週目標

- 建立 Web 專案基本結構
- 認識 HTML、CSS 與 JavaScript 的用途
- 使用本機伺服器開啟網頁
- 建立 GitHub 學習紀錄

### 建立的檔案

- `index.html`：定義網頁內容與結構
- `style.css`：設定網頁外觀與樣式
- `app.js`：設定網頁互動行為
- `README.md`：說明專案用途與執行方式
- `web.md`：記錄每週學習過程
- `ai.md`：記錄 AI 協作與驗證過程
- `.gitignore`：排除不需要上傳的檔案

### 實作內容

1. 使用 HTML 建立標題、說明文字與按鈕。
2. 使用 `<link>` 將 `style.css` 連接至 HTML。
3. 使用 CSS 設定背景、標題及按鈕樣式。
4. 使用 `cursor: pointer` 讓滑鼠移到按鈕時顯示手指圖示。
5. 使用 `button:hover` 設定滑鼠移入按鈕時的變色效果。
6. 使用 JavaScript 取得按鈕元素並監聽點擊事件。
7. 點擊按鈕後，使用 `alert()` 顯示提示訊息。
8. 使用 `python -m http.server 5500` 啟動本機伺服器。
9. 使用瀏覽器開啟 `http://localhost:5500` 測試網頁。

### 遇到的問題與處理方式

#### 1. `npx` 指令無法執行

電腦目前無法使用 `npx http-server`，因此改用 Python 內建的 HTTP Server 啟動網頁。

#### 2. CSS 顏色沒有顯示

檢查 `style.css` 是否已儲存，以及 HTML 中的 CSS 路徑是否正確，重新整理後成功顯示樣式。

#### 3. localhost 顯示找不到頁面

原因是本機伺服器已停止。重新執行 `python -m http.server 5500` 後，網頁恢復正常。

### Learning Log

本週了解 HTML、CSS 與 JavaScript 各自負責不同工作：

- HTML 負責網頁內容與結構。
- CSS 負責顏色、間距及外觀。
- JavaScript 負責點擊等互動行為。

也理解 `localhost` 代表自己的電腦，而 `5500` 是本次 Web Server 使用的連接埠。若終端機中的伺服器停止，瀏覽器就無法繼續開啟該網址。

### 本週心得

第一次將 HTML、CSS 與 JavaScript 分成不同檔案並連接起來。透過實際測試顏色、按鈕效果及點擊事件，開始理解瀏覽器如何讀取網頁檔案。

遇到畫面未更新或找不到頁面時，也學會先檢查檔案是否儲存，以及本機伺服器是否仍在執行。