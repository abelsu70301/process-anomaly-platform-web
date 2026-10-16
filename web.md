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

---

## W4：CSS 版面與 RWD

### 本週目標

- 理解 CSS Box Model。
- 使用 Grid 建立側邊欄與主要內容版面。
- 使用 Flexbox 排列功能選單。
- 使用 CSS 變數建立一致的配色。
- 完成深色模式切換。
- 驗證手機、平板及桌機版面。

### 操作紀錄

- 建立 `page-layout`，包住側邊欄與主要內容。
- 手機版採用單欄排列。
- 螢幕寬度達到 600px 時改為左右兩欄。
- 使用 Flexbox 製作直向功能選單。
- 加入資料狀態、分析狀態及歷史紀錄卡片。
- 使用 `auto-fit` 與 `minmax()` 讓卡片自動換行。
- 建立 CSS 顏色變數。
- 使用 JavaScript 切換深色與淺色模式。
- 加入語意化 `footer` 頁尾。
- 使用瀏覽器開發者工具測試不同螢幕寬度。

### 尚未完成

- 真正讀取與檢查 CSV 資料。
- 執行資料分析模型。
- 顯示實際分析結果。
- 從資料庫讀取歷史紀錄。
- 讓側邊選單切換不同內容。

### 學習重點

#### Box Model

HTML 元素可以視為一個盒子，包含內容、內距、邊框及外距。這次使用 `padding`、`border`、`margin` 和 `gap` 控制區塊間距。

#### Grid 與 Flexbox

Grid 適合控制側邊欄與主要內容等二維版面；Flexbox 適合控制功能選單等單一方向的排列。

#### Mobile First

先設計手機版的單欄排列，再使用 `@media` 為較寬的螢幕加入左右兩欄版面。

#### CSS 變數

使用 `:root` 統一管理顏色，再透過 `var()` 套用。深色模式只需要覆蓋變數，不必重寫所有元件樣式。

### 遇到的問題與解決方式

#### Grid 沒有生效

`button:hover` 的 CSS 變數缺少 `);`，導致瀏覽器無法正確解析後面的 `.page-layout` 和 `@media`。補上完整語法後，左右兩欄恢復正常。

#### JavaScript 沒有立即更新

瀏覽器可能仍使用舊版 JavaScript 快取，因此在載入路徑加入版本參數：

```html
<script src="./app.js?v=4"></script>
```

#### 側邊欄顯示在上方

使用瀏覽器開發者工具確認實際寬度，並將 RWD 斷點調整為 600px。寬度低於斷點時顯示上下排列，高於斷點時顯示左右排列。

### 本週心得

這週理解 Grid 與 Flexbox 的用途不同：Grid 適合控制頁面主要版面，Flexbox 適合單一方向的元件排列。
透過 mobile first 和 RWD 測試，可以讓同一個網頁適應不同尺寸的裝置；CSS 變數則能集中管理配色，讓深色模式更容易維護。

實作過程中曾遇到功能選單沒有呈現在左側，以及按下深色模式按鈕後畫面沒有變色的問題。
我使用瀏覽器開發者工具確認視窗寬度與實際套用的 Grid 欄位，並透過 PowerShell 查看 CSS 內容，最後發現 CSS 變數語法缺少 `);`，導致後續版面規則沒有生效。
另外，也在 JavaScript 路徑加入版本參數，避免瀏覽器繼續載入舊的快取。這次除錯讓我了解，小幅的語法錯誤也可能影響後續整段樣式，因此需要從實際套用結果逐步確認問題。

---

## W5：JavaScript DOM 操作與事件處理

### 本週目標

- 理解 Event、Function、DOM Change 與 UI Result 的互動流程。
- 使用 JavaScript 取得 HTML 元素並監聽使用者操作。
- 透過 DOM 操作更新頁面文字與 CSS class。
- 將互動功能套用到製程異常分析輔助平台。

### 操作紀錄

- 使用 `getElementById()` 取得 CSV 欄位、資料狀態與分析狀態元素。
- 監聽 CSV 欄位的 `change` 事件。
- 使用 `files[0]` 取得使用者選擇的第一個檔案。
- 選擇 CSV 後，在資料狀態卡片顯示檔案名稱。
- 將「開始分析」按鈕原本的提示視窗改為頁面狀態更新。
- 建立具名函式 `updateFileStatus()` 與 `updateAnalysisStatus()`。
- 使用 `querySelectorAll()` 取得所有狀態卡片。
- 點擊卡片時加入 `is-selected`，並移除其他卡片的選取狀態。
- 使用 CSS 顯示目前選取的卡片。
- 更新 JavaScript 載入版本，避免瀏覽器繼續使用舊快取。
- 測試 CSV 檔名顯示、分析狀態更新、卡片選取與深色模式。

### 尚未完成

- 實際上傳及讀取 CSV 資料。
- 檢查 CSV 欄位與資料格式。
- 呼叫後端 API 執行分析。
- 顯示模型評估與可疑因子排名。
- 將分析結果與工程師備註保存至資料庫。

### 學習重點

- DOM 是瀏覽器將 HTML 轉換成可由 JavaScript 操作的網頁物件。
- 一條完整的前端互動可以整理成「Event → Function → DOM Change → UI Result」。
- `getElementById()` 適合取得具有唯一 ID 的元素。
- `querySelectorAll()` 可以取得多個符合 CSS 選擇器的元素。
- `addEventListener()` 用來監聽 click、change 等使用者事件。
- `textContent` 可以修改元素顯示的文字。
- `classList.add()` 與 `classList.remove()` 可以改變元素的 CSS 狀態。
- 將具名函式交給事件監聽器時不加括號，讓函式在事件發生後才執行。
- JavaScript 修改 class 後，仍需要 CSS 定義對應樣式，畫面才會呈現變化。

### 遇到的問題與解決方式

- JavaScript 加入 `is-selected` 後，畫面不會自動產生選取效果，因此在 CSS 中新增 `.summary-card.is-selected` 樣式。
- 為避免瀏覽器載入舊版 JavaScript，將 `app.js` 的版本參數更新為 `v=5`。
- 使用 `git diff --check` 檢查格式時，發現 `app.js` 檔案結尾多出空白行，移除多餘空白後再重新檢查。

### 本週心得

本週開始使用 JavaScript 控制實際的網頁內容。透過 CSV 欄位、開始分析按鈕及狀態卡片的操作，我理解到網頁互動可以拆成 Event、Function、DOM Change 與 UI Result。先確認事件發生在哪個元素，再追蹤執行的函式及被修改的 DOM，比只逐行閱讀語法更容易掌握整體流程。

我也理解 JavaScript 與 CSS 需要互相配合。JavaScript 負責加入或移除狀態 class，CSS 則決定該狀態呈現的外觀。後續除錯時，可以依序檢查事件是否發生、函式是否執行、DOM 是否改變，以及 CSS 是否有對應樣式。