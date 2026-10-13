# Web Programming 學習紀錄

## Project Milestone

- [x] W1：建立 Web 專案及基本靜態網頁
- [x] W2：完成 Web UI 與語意化 HTML
- [x] W3：完成 FastAPI 與 Uvicorn 本機部署
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

---

## W3：使用 FastAPI 與 Uvicorn 提供靜態網頁

### 本週目標

- 認識 FastAPI、Uvicorn 與 ASGI
- 建立 Python 虛擬環境
- 使用 StaticFiles 提供靜態網頁
- 透過本機伺服器開啟網站
- 為後續加入後端功能與公開部署做準備

### 操作紀錄

- [x] 在 WEB 專案中建立 `venv` 虛擬環境
- [x] 啟動 Python 虛擬環境
- [x] 安裝 FastAPI、Uvicorn 與 aiofiles
- [x] 建立 `requirements.txt`
- [x] 建立 `server.py`
- [x] 建立 `site` 資料夾
- [x] 將 `index.html` 移至 `site` 資料夾
- [x] 將 `app.js` 移至 `site` 資料夾
- [x] 將 `css` 資料夾移至 `site` 資料夾
- [x] 使用 Uvicorn 在 7777 埠啟動網站
- [x] 測試 HTML、CSS 與 JavaScript 是否正常載入
- [x] 使用實驗室電腦 IP 與 7777 埠開啟網頁
- [x] 使用老師或助教設定的公開網址開啟網頁

### 尚未完成

本週部署相關實作皆已完成。

### 學習重點

- FastAPI：用來建立 Python Web 應用程式。
- Uvicorn：負責啟動並執行 Web 伺服器。
- ASGI：Python Web 應用程式與伺服器之間的溝通標準。
- StaticFiles：提供 HTML、CSS、JavaScript 等靜態檔案。
- 虛擬環境：將不同專案使用的 Python 套件分開管理。
- `requirements.txt`：記錄專案需要安裝的 Python 套件。
- `--reload`：修改程式後自動重新啟動伺服器。
- `--host 0.0.0.0`：讓伺服器監聽電腦上的網路介面。
- `--port 7777`：指定伺服器使用 7777 埠。
- `Ctrl + C`：停止正在執行的伺服器。
- `localhost`：代表目前使用的這一台電腦。

### 遇到的問題與解決方式

#### 1. PowerShell 無法啟動虛擬環境

執行 `Activate.ps1` 時，PowerShell 顯示系統已停用指令碼執行。

使用以下指令，只在目前的 PowerShell 視窗暫時允許執行指令碼：

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\venv\Scripts\Activate.ps1
```

關閉 PowerShell 後，這項暫時設定就會失效，不會永久修改整台電腦的執行原則。

#### 2. 重複執行 Move-Item 時顯示找不到檔案

第一次執行時，`index.html`、`app.js` 與 `css` 已經成功移至 `site` 資料夾。

第二次執行相同指令時，原本位置已經沒有這些檔案，所以 PowerShell 顯示找不到路徑。這不代表檔案遺失，只是檔案已經完成搬移。

使用以下指令確認檔案位置：

```powershell
Get-ChildItem site -Recurse
```

#### 3. 避免將 venv 上傳到 GitHub

`venv` 內包含大量可以重新安裝的套件，因此不需要上傳到 GitHub。

在 `.gitignore` 中加入：

```gitignore
venv/
__pycache__/
*.pyc
```

### 專案結構

```text
WEB/
├── site/
│   ├── index.html
│   ├── app.js
│   └── css/
│       └── style.css
├── server.py
├── requirements.txt
├── README.md
├── web.md
├── ai.md
└── .gitignore
```

`venv` 存在於本機專案中，但已透過 `.gitignore` 排除，因此不會上傳到 GitHub。

### 啟動方式

進入 WEB 專案資料夾並啟動虛擬環境後，執行：

```powershell
python -m uvicorn server:app --reload --host 0.0.0.0 --port 7777
```

接著使用瀏覽器開啟：

```text
http://localhost:7777/
```

### 本週心得

原本使用 Python HTTP Server 開啟靜態網頁，本週改為使用 FastAPI 與 Uvicorn 提供網站內容。

將 HTML、CSS 與 JavaScript 集中放入 `site` 資料夾後，前端檔案與 Python 伺服器程式有了更清楚的區分。我也了解虛擬環境可以隔離不同專案使用的套件，而 `requirements.txt` 可以記錄專案執行所需的套件。

目前已完成本機與網路連線測試，可以透過 `http://localhost:7777/`、實驗室電腦 IP 加上 7777 埠，以及助教設定的公開網址正常顯示網頁。這次實作讓我了解公開網址、指定埠位、Uvicorn 與靜態網頁之間的連線關係。

### 程式碼重點

#### FastAPI 靜態網站設定

```python
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

app = FastAPI()

app.mount(
    "/",
    StaticFiles(directory="site", html=True),
    name="site"
)
```

#### 安裝專案套件

```powershell
python -m pip install fastapi uvicorn aiofiles
```

#### 記錄套件版本

```powershell
python -m pip freeze > requirements.txt
```

#### 啟動 Uvicorn

```powershell
python -m uvicorn server:app --reload --host 0.0.0.0 --port 7777
```