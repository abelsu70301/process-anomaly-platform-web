# AI 協作紀錄

本文件記錄專案開發過程中，與生成式 AI 進行的重要討論、問題排查及決策。

不逐一記錄所有提問，而是保留對專案實作有實際影響的內容。

---

## W1：Web 基礎與專案建立

### 1. 討論專案檔案結構

與 AI 討論 Web 專案需要建立的基本檔案，包含：

- `index.html`
- `style.css`
- `app.js`
- `README.md`
- `web.md`
- `ai.md`
- `.gitignore`

AI 說明各檔案的用途後，由本人實際建立檔案，並將 HTML、CSS 與 JavaScript 分開管理。

### 2. 本機伺服器啟動方式

原先依照建議嘗試使用 `npx http-server`，但電腦無法執行 `npx`。

與 AI 討論錯誤原因後，改用 Python 內建的 HTTP Server：

`python -m http.server 5500`

本人實際執行後，確認可以透過 `http://localhost:5500` 開啟網頁，因此採用 Python Server 作為目前的執行方式。

### 3. CSS 樣式未顯示

網頁曾經可以顯示文字，但沒有出現設定的背景與按鈕顏色。

AI 建議檢查：

- `style.css` 是否已儲存
- HTML 中的 CSS 路徑是否正確
- 瀏覽器是否載入最新內容

本人完成檢查並重新整理網頁後，確認 CSS 樣式可以正常顯示。

### 4. localhost 找不到頁面

重新整理瀏覽器時，曾出現找不到頁面的情況。

經過討論後，判斷原因是本機伺服器已經停止。本人重新執行伺服器指令後，網頁恢復正常。

此問題讓我理解：檔案仍然存在，不代表 `localhost` 一定可以開啟；必須同時保持本機伺服器運作。

### 本週驗證

AI 提供的建議皆由本人實際操作並確認結果，包括：

- 網頁內容是否正常顯示
- CSS 樣式是否成功套用
- 按鈕滑鼠移入效果是否生效
- JavaScript 點擊提示是否正常
- 本機伺服器停止與重新啟動後的差異

當原先建議的 `npx` 無法使用時，沒有直接照抄指令，而是根據實際環境改用可執行的 Python Server。

---

## W2：Web UI 與語意化 HTML

### 1. 為什麼不能全部使用 div？

我詢問 AI：既然 `div` 也能分隔內容，為什麼還要使用 `header`、`nav`、`main`、`section` 和 `aside`？

經過討論後，我理解這些標籤具有語意，可以讓開發者、瀏覽器及輔助工具知道各區塊的用途；`div` 沒有特定語意，較適合單純分組與排版。因此我將網頁改成語意化結構，而不是全部使用 `div`。

### 2. accept=".csv" 是否代表檔案一定安全？

AI 說明 `accept=".csv"` 主要用來限制檔案選擇器顯示的類型，不能保證使用者選擇的檔案內容正確或安全。

我理解未來實作上傳功能時，後端仍需要再次檢查副檔名、檔案大小、欄位及內容。目前完成的只有檔案選擇介面，尚未真正上傳或分析資料。

### 3. 規劃中的功能是否能寫進紀錄？

我原本擔心將尚未完成的分析與資料庫功能寫進文件，會讓人誤以為功能已經完成。

經過討論後，我將「專案規劃」與「尚未完成」分開記錄，並使用 `[x]` 和 `[ ]` 區分完成狀態。這樣可以同時呈現未來方向與目前的實作進度，避免文件內容與實際成果不一致。

### 本週驗證

我實際重新整理網頁，確認語意化結構、CSV 選擇欄位、工程師備註、導覽連結及 CSS 路徑皆能正常運作。

---

## W3：FastAPI、Uvicorn 與網站部署

### PowerShell 無法啟動虛擬環境

建立 `venv` 後，執行 `Activate.ps1` 時出現系統停用指令碼執行的錯誤。

與 AI 討論後，為了避免永久修改整台電腦的設定，採用只對目前 PowerShell 視窗生效的方式：

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\venv\Scripts\Activate.ps1
```

本人實際執行後，終端機成功出現 `(venv)`，確認虛擬環境已啟動。

### 本週驗證

本人實際確認：

- `http://localhost:7777/` 可以顯示網頁
- 使用指定埠位可以顯示網頁
- 課程提供的公開網址可以顯示網頁
- CSS 樣式與 JavaScript 按鈕功能正常
- `venv` 已透過 `.gitignore` 排除

---

## W4：CSS 版面與 RWD


#### RWD 版面規劃

我請 AI 協助將原本的單欄頁面改成 mobile first 的響應式版面。經過討論後，手機版先維持上下排列，再使用 CSS Grid 和 `@media` 讓較寬的畫面顯示成側邊欄與主要內容兩欄。

我也將斷點從常見的 768px 調整為 600px，並使用瀏覽器開發者工具測試 375px、768px 和 1280px，確認版面能依裝置寬度調整。

#### 側邊欄與深色模式除錯

實作時曾遇到功能選單沒有顯示在左側，以及深色模式沒有立即變色的問題。AI 引導我依序檢查瀏覽器實際寬度、Grid 計算結果和 CSS 原始內容。

最後發現 `button:hover` 中的 CSS 變數少了 `);`，使後面的 Grid 與 media query 無法正確解析。修正語法後，側邊欄恢復左右排列。另外，在 JavaScript 載入路徑加入版本參數，避免瀏覽器使用舊的快取檔案。

### 本週驗證

- 手機寬度時，側邊欄與主要內容上下排列。
- 平板與桌機寬度時，側邊欄位於左側。
- 狀態卡片會依畫面寬度自動換行。
- 深色與淺色模式可以正常切換。
- 頁面在不同寬度下沒有明顯跑版。

---

---

## W5：JavaScript DOM 操作與事件處理

### 1. DOM 互動如何套用到專案

**討論內容：**

目前的網站只有靜態畫面，因此我們討論 W5 的 DOM 與事件處理可以如何結合「製程異常分析輔助平台」。

**討論結果：**

決定加入三項符合專案操作流程的互動：

- 選擇 CSV 後顯示檔案名稱。
- 點擊「開始分析」後更新分析狀態。
- 點擊狀態卡片後顯示目前選取的卡片。

目前只建立前端互動，尚未真正上傳、讀取或分析 CSV 資料。

### 2. 匿名函式與具名函式

**討論內容：**

原本「開始分析」按鈕使用匿名函式顯示提示視窗。我們討論是否應該保留原本寫法，或改成獨立函式。

**討論結果：**

將功能改成具名函式 `updateAnalysisStatus()`，並直接修改頁面上的分析狀態。具名函式可以清楚表示功能用途，也較方便日後重複使用與除錯。

### 3. 單一元素與多個元素的取得方式

**討論內容：**

CSV 欄位、狀態文字和三張狀態卡片的數量不同，因此討論應該使用哪一種 DOM 元素取得方式。

**討論結果：**

- 具有唯一 ID 的元素使用 `getElementById()`。
- 共用 `summary-card` class 的多張卡片使用 `querySelectorAll()`。
- 使用 `forEach()` 分別替每張卡片加入點擊事件。

### 4. JavaScript 與 CSS 的配合

**討論內容：**

JavaScript 已經替被點擊的卡片加入 `is-selected`，但是一開始畫面沒有明顯變化。

**討論結果：**

確認 JavaScript 只負責加入或移除狀態，仍需要使用 CSS 定義 `.summary-card.is-selected` 的外觀。加入藍色邊框與陰影後，才能看出目前選取的卡片。

### 5. 瀏覽器快取問題

**討論內容：**

修改 JavaScript 後，重新整理網頁仍然沒有出現新的互動效果。

**討論結果：**

將載入 JavaScript 的路徑更新為 `./app.js?v=5`，讓瀏覽器重新載入新版檔案，避免繼續使用先前的快取。

### 本週驗證

本人實際操作並確認：

- 選擇 CSV 後會顯示所選檔案名稱。
- 點擊「開始分析」後會更新分析狀態。
- 點擊狀態卡片時，選取框會跟著移動。
- 一次只會有一張卡片顯示選取狀態。
- 深色與淺色模式仍能正常切換。

---

## W6：Fetch API、AJAX 與 HTTP 錯誤處理

### 1. 為什麼先使用公開 API

**討論內容：**

目前專案還沒有真正的分析 API，因此討論是否應該直接建立後端分析功能，或先使用公開 API 練習前端請求流程。

**討論結果：**

先使用 JSONPlaceholder 的 `/todos/1` 公開端點，練習 `fetch()`、HTTP Response、JSON 解析及 DOM 更新。這個 API 只提供測試資料，不代表已經完成製程異常分析。

等熟悉前端請求流程後，再將網址替換成專案自己的 FastAPI 分析端點。

### 2. async 是否只是程式註解

**討論內容：**

看到「async 表示函式中會有需要等待的網路操作」時，我詢問這段說明是否也需要寫進程式。

**討論結果：**

中文句子只是幫助理解的註解，真正影響程式行為的是函式前面的 `async`。

因為函式內使用了 `await`，所以函式必須寫成 `async function`。若只有中文註解而沒有 `async` 關鍵字，程式仍然無法正常使用 `await`。

### 3. 為什麼 fetch 要請求指定網址

**討論內容：**

我詢問為什麼 `fetch()` 要請求：

`https://jsonplaceholder.typicode.com/todos/1`

**討論結果：**

這是提供練習使用的公開 API。`/todos/1` 表示取得編號為 1 的測試資料，回應中包含 `userId`、`id`、`title` 與 `completed`。

本次使用其中的 `title` 更新分析狀態卡片，目的是先確認完整的 API 請求與畫面更新流程可以正常運作。

### 4. HTTP 404 是否會自動進入 catch

**討論內容：**

為了確認錯誤處理是否真的有效，我們將 API 網址暫時改成不存在的 `/not-found-api`。

**討論結果：**

Network 顯示 HTTP 404，`response.ok` 變成失敗狀態。程式使用 `throw` 主動產生錯誤，再由 `catch` 接收，因此網頁顯示「API 連線失敗」。

測試完成後，再將網址恢復成正確的 JSONPlaceholder API，確認網頁重新顯示「API 連線成功」。

### 5. CORS 為什麼會看到自己的網頁網址

**討論內容：**

觀察 CORS 資訊時，我原本預期看到 `*`，但畫面中出現自己的網頁網址，因此詢問兩者的差異。

**討論結果：**

自己的網頁網址可能出現在 Request Header 的 `Origin`，表示這次請求從哪一個網頁發出。

API 回應中的 `Access-Control-Allow-Origin` 才表示伺服器允許哪一個 Origin 讀取資料。允許特定網址或允許所有來源，都屬於 API 伺服器的 CORS 設定方式。

### 6. JavaScript 快取版本更新

**討論內容：**

修改 `app.js` 後，需要避免瀏覽器繼續載入 W5 的舊版 JavaScript。

**討論結果：**

將 HTML 中的 JavaScript 載入路徑更新為：

`./app.js?v=6`

版本參數不會修改 JavaScript 的功能，只是讓瀏覽器將它視為新的資源並重新下載。

### 本週驗證

本人實際操作並確認：

- 點擊「開始分析」後會顯示正在連線的狀態。
- 公開 API 成功回傳 JSON 資料。
- Console 可以看到解析後的 JavaScript 物件。
- Network 可以看到 GET Request 與 HTTP 200。
- API 回傳的 `title` 可以顯示在分析狀態卡片。
- 使用不存在的網址時，Network 顯示 HTTP 404。
- 發生錯誤時，網頁會顯示「API 連線失敗」。
- 恢復正確網址後，API 連線重新成功。
- 深色模式、CSV 檔名顯示及卡片選取功能仍能正常使用。

---

## W7：專案 API、動態路徑與卡片詳情

### 1. 如何將老師的 API 範例套用到目前專案

**討論內容：**

老師教材使用 `/api/root`、Department、Course 和 Member 等資料建立導覽選單及 Dashboard Cards，但目前專案是製程異常分析輔助平台，沒有相同的課程資料。

**討論結果：**

保留教材的核心流程，將它調整成目前專案可理解的內容：

- `/api/root` 改為 `/api/summary`。
- Dashboard Cards 對應資料狀態、分析狀態及歷史紀錄。
- `/api/root/co/{cid}` 的概念改為 `/api/summary/{element_id}`。
- 點擊卡片後，再向 API 取得對應的詳細說明。

目前回傳的是測試狀態，尚未假裝已經完成 CSV 分析或資料庫連線。

### 2. API 為什麼要放在 app.mount 前面

**討論內容：**

目前 `server.py` 使用 `app.mount("/")` 提供整個 `site` 資料夾，因此討論新的 API 應該放在哪個位置。

**討論結果：**

由於 StaticFiles 掛載在根路徑，可能先接收後面的請求，所以 `/api/summary` 和 `/api/summary/{element_id}` 必須宣告在 `app.mount()` 前面。

這也讓我理解 FastAPI 不只需要正確的網址，路由宣告順序也可能影響請求由哪一個處理程序接收。

### 3. 如何讓三張卡片共用同一套程式

**討論內容：**

如果分別替資料狀態、分析狀態及歷史紀錄撰寫程式，會產生許多重複內容。

**討論結果：**

API 為每筆卡片資料提供 `element_id`、`name` 和 `value`。前端使用 `forEach()` 逐筆處理，並透過 `getElementById()` 找到對應元素。

另外建立共用的 `readJson()`，讓公開 API、摘要 API 及詳情 API 都能使用相同的 HTTP 檢查與 JSON 解析流程。

### 4. 路徑參數與 HTTP 404

**討論內容：**

老師教材中的 `{cid}` 會依照使用者點擊項目改變，因此討論如何在目前專案練習相同概念。

**討論結果：**

建立：

`/api/summary/{element_id}`

點擊不同卡片時，會分別帶入 `fileStatus`、`analysisStatus` 或 `historyStatus`。

如果傳入不存在的值，FastAPI 使用 `HTTPException` 回傳 404。前端再透過 `readJson()`、`throw` 及 `catch` 顯示失敗狀態。

### 5. 為什麼 HTTP 200 仍然顯示載入失敗

**討論內容：**

測試 `/api/summary/fileStatus` 時，Network 顯示 HTTP 200，但網頁詳情區仍顯示「載入失敗」。

**排查過程：**

先確認：

- Request URL 正確。
- API 狀態為 HTTP 200。
- `loadSummaryDetail()` 與 `renderSummaryDetail()` 的結構沒有明顯錯誤。
- Console 顯示 `RangeError: Maximum call stack size exceeded`。
- 錯誤堆疊重複出現 `readJson()`。

**討論結果：**

`readJson()` 內部誤寫成再次呼叫自己，造成無限遞迴：

```text
readJson()
→ readJson()
→ readJson()
→ 呼叫堆疊用盡
```

---

## W8：表單處理、前後端驗證與 XSS 防護

### 1. 為什麼要監聽表單 submit，而不是只監聽按鈕 click

**討論內容：**

原本的「開始分析」按鈕使用點擊事件執行功能。進入表單處理後，按鈕改為 `type="submit"`，因此討論原本的按鈕事件是否還需要保留。

**討論結果：**

改為監聽整個表單的 `submit` 事件，並使用：

```javascript
event.preventDefault();
```

阻止瀏覽器重新整理頁面。

監聽 `submit` 不只能處理滑鼠點擊，也可以處理使用鍵盤提交表單的情況，因此比只監聽按鈕的 `click` 更完整。

### 2. 為什麼前端驗證後，後端還要再驗證

**討論內容：**

前端已經檢查 CSV 副檔名及工程師備註長度，因此討論是否還需要在 FastAPI 重複驗證。

**討論結果：**

前端驗證主要是讓使用者立即知道輸入錯誤，但不能視為安全機制。

使用者可能關閉 JavaScript、修改網頁程式，或不經過網頁直接呼叫 API，因此後端仍然必須使用 Pydantic 與自訂規則驗證資料。

本週形成的驗證流程為：

```text
HTML 內建驗證
→ JavaScript 前端驗證
→ FastAPI 與 Pydantic 後端驗證
→ 回傳驗證結果
```

### 3. updateAnalysisStatus() 是否還要保留

**討論內容：**

表單已經有 `submit` 事件，因此討論 `updateAnalysisStatus()` 是否可以刪除。

**討論結果：**

保留 `updateAnalysisStatus()`，但改變它的工作內容。

表單事件負責：

- 阻止頁面重新整理。
- 取得檔案與工程師備註。
- 執行前端驗證。

`updateAnalysisStatus()` 負責：

- 發送 POST Request。
- 等待後端回應。
- 處理 HTTP 錯誤。
- 更新分析狀態卡片。

這樣可以將表單驗證與 API 請求分開，避免所有程式都擠在同一個事件函式中。

### 4. 為什麼 API 成功後出現 undefined

**討論內容：**

後端已經成功回傳資料，但畫面顯示：

```text
API 連線成功：undefined
```

**排查過程：**

檢查 `updateAnalysisStatus()` 後發現，新程式已經使用：

```javascript
analysisStatus.textContent = data.message;
```

但下面仍保留 W06 公開 API 測試時使用的舊程式：

```javascript
analysisStatus.textContent = `API 連線成功：${data.title}`;
```

W08 後端回傳的 JSON 沒有 `title` 欄位，所以 `data.title` 的結果是 `undefined`。而且舊程式位於後面，會覆蓋前面正確設定的文字。

**討論結果：**

刪除讀取 `data.title` 的舊程式，只保留：

```javascript
analysisStatus.textContent = data.message;
```

修正後，畫面可以正確顯示「後端驗證成功」。

### 5. 為什麼要使用 textContent 顯示備註

**討論內容：**

工程師備註是使用者可以自由輸入的內容，因此討論將它顯示到網頁時可能產生的安全問題。

使用以下內容測試：

```html
<img src=x onerror=alert('XSS')>
```

**討論結果：**

網頁使用 `textContent` 顯示備註，所以輸入內容只會被當成普通文字，不會被瀏覽器解讀成 HTML，也不會執行 `onerror`。

如果直接將使用者輸入放入 `innerHTML`，瀏覽器可能解析其中的標籤或事件，增加 XSS 風險。

因此沒有必要解析 HTML 時，應優先使用 `textContent`。

### 6. 如何判斷 HTTP 400、422 與 200

**討論內容：**

使用 FastAPI `/docs` 測試後端時，分別得到 HTTP 200、400 與 422，因此討論這些狀態的差異。

**討論結果：**

- HTTP 200：資料格式及專案驗證規則都通過。
- HTTP 400：資料結構可以被接收，但內容不符合專案規則，例如不是 CSV 檔名。
- HTTP 422：送出的 JSON 缺少必要欄位，或不符合 Pydantic 模型定義。

透過 `/docs` 分別測試正確資料、錯誤副檔名及缺少 `file_name`，可以確認後端驗證不是只處理成功情況，也能正確回報不同類型的輸入錯誤。