# Web Programming 學習紀錄

## Project Milestone

- [x] W1：建立 Web 專案及基本靜態網頁
- [x] W2：完成 Web UI 與語意化 HTML
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


## W2：Web UI 與語意化 HTML

### 本週目標

- 認識 HTML 語意化標籤
- 建立資料上傳表單
- 整理網頁檔案結構
- 完成初步專案規劃

### 操作紀錄

- [x] 使用 `header` 建立頁首
- [x] 使用 `aside` 與 `nav` 建立功能選單
- [x] 使用 `main` 與 `section` 建立主要內容
- [x] 建立 CSV 檔案選擇欄位
- [x] 建立工程師備註輸入區
- [x] 建立「開始分析」按鈕
- [x] 建立頁面內導覽連結
- [x] 建立 `css` 資料夾
- [x] 將 `style.css` 移至 `css` 資料夾
- [x] 修改 HTML 中的 CSS 檔案路徑

### 尚未完成

- [ ] 實際讀取 CSV 資料
- [ ] 執行資料分析
- [ ] 顯示分析結果
- [ ] 將分析紀錄保存至資料庫

### 學習重點

- `header`：頁面或區塊頂端的內容。
- `aside`：主要內容旁邊的輔助區域。
- `nav`：放置網站導覽連結。
- `main`：網頁最主要的內容。
- `section`：具有特定主題的內容區塊。
- `form`：包住一組需要輸入或送出的資料。
- `label`：說明輸入欄位的用途。
- `input`：建立資料輸入欄位。
- `textarea`：建立多行文字輸入區。
- `strong`：表示重要內容。
- `small`：表示補充或次要資訊。
- `div`：沒有特定語意，主要用於分組與排版。

### 遇到的問題與解決方式

#### 按鈕沒有換行

使用 `<div class="form-actions">` 包住按鈕。因為 `div` 預設是區塊元素，所以按鈕會從新的一行開始。

#### 移動 CSS 後樣式沒有出現

因為 `style.css` 已經移到 `css` 資料夾，所以需要將 HTML 中的路徑修改為：

```html
<link rel="stylesheet" href="./css/style.css">
```

#### 導覽連結如何跳到指定區塊

在連結的 `href` 使用 `#analysis`，並在目標區塊設定相同的 `id`：

```html
<a href="#analysis">異常分析</a>

<section id="analysis">
```

### 專案規劃

- **問題：** 協助工程師從製程資料中找出異常相關因素。
- **使用者：** 製程、設備及品質工程師。
- **核心功能：** 上傳 CSV、檢查資料、執行異常分類、顯示可疑因子並保存紀錄。
- **資料：** 使用公開製程資料集，不使用公司機密資料。
- **MVP：** 完成上傳資料、顯示分析結果及保存紀錄的基本流程。

### 本週心得

語意化標籤可以讓瀏覽器、開發者及輔助工具更容易理解網頁結構。並非所有區塊都使用 `div`，而是依照內容用途選擇適合的標籤；只有單純分組或排版時才使用 `div`。

目前建立的是操作介面，選擇 CSV 檔案後，尚未真正讀取、上傳或分析資料。

### 程式碼重點

#### CSS 檔案連結

```html
<link rel="stylesheet" href="./css/style.css">
```

#### 功能選單

```html
<aside>
    <h2>功能選單</h2>

    <nav>
        <a href="#analysis">異常分析</a>
    </nav>
</aside>
```

#### CSV 檔案選擇

```html
<label for="csvFile">選擇 CSV 檔案：</label>
<input
    type="file"
    id="csvFile"
    name="csvFile"
    accept=".csv"
>
```

#### 工程師備註

```html
<div class="form-field">
    <label for="engineerNote">工程師備註：</label>
    <textarea
        id="engineerNote"
        name="engineerNote"
        rows="4"
        placeholder="請輸入分析條件或現場觀察記錄"
    ></textarea>
</div>
```

#### 開始分析按鈕

```html
<div class="form-actions">
    <button type="button" id="startButton">開始分析</button>
</div>
```