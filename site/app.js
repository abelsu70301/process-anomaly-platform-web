const startButton = document.getElementById("startButton");  
//const：建立一個不會重新指定的變數
//startButton：我們替這個變數取的名稱
//document：代表目前這份 HTML 網頁
//getElementById(...)：依照 id 尋找 HTML 元素
//"startButton"：對應按鈕的 id="startButton"

const csvFileInput = document.getElementById("csvFile");  //csvFileInput：代表 HTML 的 CSV 檔案輸入欄位
const fileStatus = document.getElementById("fileStatus");  //fileStatus：代表顯示資料狀態的 <p>
const analysisStatus = document.getElementById("analysisStatus");  //analysisStatus：代表顯示分析狀態的 <p>
const summaryCards = document.querySelectorAll(".summary-card");  //summaryCards：代表所有的 summary-card 元素，querySelectorAll() 會回傳一個陣列
const summaryDetailTitle = document.getElementById("summaryDetailTitle");  //取得摘要詳情的標題元素
const summaryDetailText = document.getElementById("summaryDetailText");  //取得摘要詳情的說明文字元素
const analysisForm = document.getElementById("analysisForm");  //取得分析表單元素
const formMessage = document.getElementById("formMessage");  //取得表單訊息顯示元素
const engineerNoteInput = document.getElementById("engineerNote");  //取得工程師備註輸入欄位元素
const loginForm = document.getElementById("loginForm");  //取得登入表單
const loginEmailInput = document.getElementById("loginEmail");  //取得 Email 輸入欄位
const loginPasswordInPut = document.getElementById("loginPassword");  //取得密碼輸入欄位
const loginMessage = document.getElementById("loginMessage");  //取得登入狀態文字
const googleLoginButton = document.getElementById("googleLoginButton");  //取得模擬 Google 登入按鈕
const storageNicknameInput = document.getElementById("storageNickname");  //測試暱稱輸入欄位
const saveLocalButton = document.getElementById("saveLocalButton");  //LocalStorage 儲存按鈕
const saveSessionButton = document.getElementById("saveSessionButton");  //SessionStorage 儲存按鈕
const saveCookieButton = document.getElementById("saveCookieButton");  //Cookie 儲存按鈕
const readStorageButton = document.getElementById("readStorageButton");  //讀取全部按鈕
const clearStorageButton = document.getElementById("clearStorageButton");  //清除全部按鈕
const storageMessage = document.getElementById("storageMessage");  //顯示測試結果
const startServerSessionButton = document.getElementById("startServerSessionButton");  //建立後端 Session 按鈕
const checkServerSessionButton = document.getElementById("checkServerSessionButton");  //檢查後端 Session 按鈕
const logoutServerSessionButton = document.getElementById("logoutServerSessionButton");  //刪除後端 Session 按鈕
const serverSessionMessage = document.getElementById("serverSessionMessage");  //顯示後端 Session 測試結果
const sidebarToggle = document.getElementById("sidebarToggle");  //左上角按鈕
const sidebar = document.getElementById("sidebar");  //側邊欄

//建立共用函式
function setSidebarOpen(open) {  //opem是自訂參數名稱，呼叫時傳入true:展開;false:收合
    sidebar.classList.toggle("is-open", open);  //toggle有兩個參數true.false
    document.body.classList.toggle("sidebar-open", open);  //讓整個頁面同步知道選單是否展開
    sidebar.inert = !open;  //跟open狀態相反，若open為true，取消insert可以操作
    sidebarToggle.setAttribute("aria-expanded", String(open));  //再更新輔助資訊
    //setAttribute()用來修改HTML屬性;String(open)把布林值轉成文字
    const label = open ? "關閉功能選單" : "開啟功能選單";  //三元運算子
    //等於 let label; 若open則label=關閉功能選單，否則=開啟功能選單
    sidebarToggle.setAttribute("aria-label", label);  //把文字放進按鈕和滑鼠提示
    sidebarToggle.setAttribute("title", label);
}

sidebarToggle.addEventListener("click", function() {
    const open = !sidebar.classList.contains("is-open");  //contains()會檢查目前是否展開，再用!取得相反狀態
    setSidebarOpen(open);
});

//也可以按 ESC 收起選單
document.addEventListener("keydown", function(event) {
    if (event.key === "Escape" &&  //按下按鍵為ESC
        sidebar.classList.contains("is-open")) {  //選單目前已展開
            sidebarToggle.focus();  //focus()先把鍵盤焦點移回按鈕
            setSidebarOpen(false);  //再收起選單，避免焦點留在即將不能操作的區域
        }
});

function getStorageNickname() { //統一取得並檢查測試暱稱
    const nickname = storageNicknameInput.value.trim();

    if (!nickname) {
        storageMessage.textContent = "請先輸入測試暱稱";
        return null;  //沒有輸入時回傳 null，停止儲存
    }
    return nickname;
}

function saveToLocalStorage() {
    const nickname = getStorageNickname();

    if (nickname === null) {
        return;
    }

    localStorage.setItem("process_anomaly_nickname", nickname);  //將資料保存至瀏覽器  //localStorage.getItem()：讀取 LocalStorage

    storageMessage.textContent = `已將「${nickname}」儲存至 LocalStorage`;
}  //LocalStorage 的資料重新整理或關閉分頁後通常仍會保留

saveLocalButton.addEventListener("click", saveToLocalStorage);

function saveToSessionStorage() {
    const nickname = getStorageNickname();

    if(nickname === null) {
        return;
    }

    sessionStorage.setItem("process_anomaly_nickname", nickname);  //sessionStorage.getItem()：讀取 SessionStorage

    storageMessage.textContent = `已將「${nickname}」儲存至 SessionStorage`;
}  //SessionStorage：只屬於目前分頁的工作階段，關閉該分頁後通常會清除

saveSessionButton.addEventListener("click", saveToSessionStorage);

function saveToCookie() {
    const nickname = getStorageNickname();

    if (nickname === null) {
        return;
    }

    document.cookie = `process_anomaly_nickname=${encodeURIComponent(nickname)}; ` + "Path=/; Max-Age=3600; SameSite=Lax";
    //document.cookie:取得目前 JavaScript 可以讀取的 Cookie 字串
    // // encodeURIComponent()：把中文及特殊字元轉成適合放入 Cookie 的格式
    //Path=/：整個網站路徑都能使用這筆 Cookie  //SameSite=Lax：限制部分跨站請求自動附帶 Cookie，降低部分 CSRF 風險

    storageMessage.textContent = `已將「${nickname}」儲存至 Cookie`;
}

saveCookieButton.addEventListener("click", saveToCookie);

function getCookieValue(cookieName) {
    const prefix = `${cookieName}=`;

    const matchedCookie = document.cookie.split(";").find(function(cookieItem){return cookieItem.startsWith(prefix);});
    //.split("; ")：把多筆 Cookie 分開  //.find()：尋找指定名稱的 Cookie

    if(!matchedCookie) {
        return null;
    }

    return decodeURIComponent(matchedCookie.substring(prefix.length));  //decodeURIComponent()：將 Cookie 中編碼過的中文還原
}

function readAllStorage() {
    const localValue = localStorage.getItem("process_anomaly_nickname");  //讀取 LocalStorage

    const sessionValue = sessionStorage.getItem("process_anomaly_nickname");  //讀取 SessionStorage

    const cookieValue = getCookieValue("process_anomaly_nickname");

    storageMessage.textContent =
        `LocalStorage：${localValue ?? "無資料"}|` +
        `SessionStorage：${sessionValue?? "無資料"}|` +
        `Cookie：${cookieValue ?? "無資料"}`;
}  //?? "無資料"：如果讀到 null，畫面改顯示「無資料」

readStorageButton.addEventListener("click", readAllStorage);

function clearAllStorage(){
    localStorage.removeItem("process_anomaly_nickname");  //removeItem()：依照 Key 刪除 Web Storage 中的資料
    sessionStorage.removeItem("process_anomaly_nickname");

    document.cookie = "process_anomaly_nickname=; " + "Path=/ Max-Age=0; SameSite=Lax";
    //刪除 Cookie 時，必須使用相同的 Cookie 名稱與 Path  //Max-Age=0：告訴瀏覽器讓 Cookie 立即到期

    storageNicknameInput.value = "";  //清空畫面的輸入欄位
    storageMessage.textContent = "已清除 LocalStorage、SessionStorage 與 Cookie";
}  //只刪除本次測試使用的資料，不會清除網站其他儲存內容

clearStorageButton.addEventListener("click", clearAllStorage);

//點擊按鈕後向後端建立 Session
async function startServerSession() {  //宣告一個非同步函式，意思是裡面可能要等後端回應，不能直接同步完成
    serverSessionMessage.textContent = "正在建立後端 Session...";

    try {  //裡面執行可能會失敗的程式
        const response = await fetch("./api/session/start", {  //await:表示等它完成才往下執行
            method: "POST",
            credentials: "same-origin"
        });  //credentials: "same-origin"：允許同一來源的請求接收及傳送 Cookie

        const data = await readJson(response);  //讀取回應內容，並轉成 JSON 物件

        serverSessionMessage.textContent = data.message;  //把後端回傳的訊息顯示在畫面上
        console.log("建立後端 Session：", data);  //在瀏覽器 console 印出這次請求的回應，方便除錯
    } catch (error) {  //是錯誤處理：如果請求失敗，就執行錯誤訊息
        console.error("建立後端 Session 失敗：", error);
        serverSessionMessage.textContent = "建立後端 Session 失敗";
    }
}

startServerSessionButton.addEventListener("click", startServerSession);

async function checkServerSession() {
    serverSessionMessage.textContent = "正在檢查後端 Session...";

    try {
        const response = await fetch("./api/session/check", {
            method: "GET",
        credentials: "same-origin"
    });  ////瀏覽器會自動將同一來源的 Cookie 傳給後端

    const data = await readJson(response);

    serverSessionMessage.textContent = data.message;
    console.log("檢查後端 SEssion：", data);
    } catch (error) {
        console.error("檢查後端 Session 失敗：", error);
        serverSessionMessage.textContent = "檢查後端 Session 失敗";
    }
}

checkServerSessionButton.addEventListener("click", checkServerSession);

async function logoutServerSession() {
    serverSessionMessage.textContent = "正在刪除後端 Session...";

    try{
        const response = await fetch("./api/session/logout", {
            method: "POST",
            credentials: "same-origin"
        });

        const data = await readJson(response);

        serverSessionMessage.textContent = data.message;
        console.log("刪除後端 Session：", data);
    } catch (error) {
        console.error("刪除後端 Session 失敗：", error);
        serverSessionMessage.textContent = "刪除後端 Session 失敗"
    }
}

logoutServerSessionButton.addEventListener("click", logoutServerSession);

let simulatedAccessToken = null;  //暫存模擬 Token ; 重新整理頁面後就會消失

function handleLogin(event) {
    event.preventDefault();  //阻止表單重新整理頁面

    const email = loginEmailInput.value.trim();  //取得 Email 並移除前後空白
    const password = loginPasswordInPut.value;  //取得密碼，只用來確認欄位已有輸入

    if (!email || password.length <8) {
        loginMessage.textContent = "登入失敗：請確認 Email 與密碼格式";
        return;
    }

    simulatedAccessToken = {
        sub: "demo-engineer-001",
        role: "engineer",
        exp: Date.now() + 60 * 60 *1000
    };  //建立教學用 Token 資料，有效時間設定為一小時

    loginMessage.textContent = `模擬登入成功：${email} (角色：工程師) `;

    console.log("模擬 Toke：", simulatedAccessToken);
}

loginForm.addEventListener("submit", handleLogin);

function handleGoogleLogin() {
    simulatedAccessToken = {
        sub: "google-demo-user-001",
        role: "engineer",
        provider: "google",
        exp: Date.now() + 60 * 60 *1000
    };  //模擬 Google 驗證成功後，網站取得的登入資訊

    loginMessage.textContent = "模擬 Google 登入成功 (角色：工程師) ";

    console.log("模擬 Google Token：", simulatedAccessToken);
}

googleLoginButton.addEventListener("click", handleGoogleLogin);

async function readJson(response) {  //readJson：統一檢查 HTTP 狀態並解析 JSON

    if (!response.ok) {  //HTTP 狀態不是 200~299，表示請求失敗
        throw new Error(`HTTP error! status: ${response.status}`);
    }

   const data = await response.json();  //使用共用函式檢查 HTTP 狀態並解析 JSON

    return data;  //把解析完成的資料交回呼叫這個函式的地方
}


function renderSummaryCards(cards) {  //renderSummaryCards：將 API 回傳的卡片資料顯示到網頁

    cards.forEach(function (card) {  //forEach：逐筆處理 cards 陣列中的卡片資料

        const valueElement = document.getElementById(card.element_id);  //使用 API 提供的 element_id 找到對應的 <p>

        if (!valueElement) {  //如果 HTML 中找不到對應元素，就記錄警告並跳過這一筆

            console.warn(`找不到元素：${card.element_id}`);
            return;
        }

        const cardElement = valueElement.closest(".summary-card");  //closest()：從目前元素往外尋找最近的 summary-card

        const titleElement = cardElement.querySelector("h3");  //在該張卡片中尋找 <h3> 標題

        titleElement.textContent = card.name;  //使用 API 的 name 更新卡片標題

        valueElement.textContent = card.value;  //使用 API 的 value 更新卡片內容
    });
}

function renderSummaryDetail(detail) {  //renderSummaryDetail：將詳細資料 API 的 JSON 顯示到網頁

    summaryDetailTitle.textContent = detail.title;  //使用 API 回傳的 title 更新詳情標題

    summaryDetailText.textContent = detail.description;  //使用 API 回傳的 description 更新詳情內容

}

async function loadSummaryDetail(elementId) {  //loadSummaryDetail：依照卡片的 elementId 取得詳細資料

    summaryDetailTitle.textContent = "摘要詳情";
    summaryDetailText.textContent = "正在載入詳細資料...";
    //請求開始前先顯示載入狀態
    try {
        const response = await fetch(
            `./api/summary/${encodeURIComponent(elementId)}`
        );  //將 elementId 放進 API 網址; encodeURIComponent() : 避免特殊字元破壞網址格式

        const detail = await readJson(response);  //使用共用的 readJson() 檢查 HTTP 並解析 JSON

        console.log("摘要詳情：", detail);  //在 Console 顯示 API 回傳資料

        renderSummaryDetail(detail);  //將詳細資料交給 Render 函式更新 DOM

    } catch (error) {
        console.error("摘要詳情載入失敗：", error);  //在 Console 顯示詳細錯誤

        summaryDetailTitle.textContent = "載入失敗";
        summaryDetailText.textContent = "無法取得摘要詳情，請稍後再試。";  //在畫面上顯示簡單的錯誤訊息
    }
}

async function loadSummary() {  //loadSummary：向後端取得摘要資料，並更新三張卡片

    try {  //try：執行可能發生錯誤的 API 請求

        const response = await fetch("./api/summary");  //向同一個 FastAPI 網站的 /api/summary 發送 GET Request
        //沒有指定 method 時，預設使用 GET

        const data = await readJson(response);  //呼叫 readJson() 檢查 HTTP 狀態並解析 JSON

        console.log("摘要資料：", data);  //在 Console 顯示完整資料，方便確認 API 回傳內容

        renderSummaryCards(data.cards);  //取出 JSON 中的 cards 陣列，交給 Render 函式更新畫面
    } catch (error) {  //catch：接收 fetch、HTTP 或 JSON 解析過程中的錯誤

        console.error("摘要資料載入失敗：", error);  //在 Console 顯示詳細錯誤

        analysisStatus.textContent = "摘要資料載入失敗";  //在畫面上顯示簡單的錯誤訊息
    }
}


function updateFileStatus() {  //建立一個函式，名稱為 updateFileStatus
    const selectedFile = csvFileInput.files[0];  //取得使用者選擇的第一個檔案

    if (selectedFile) {  //如果使用者有選擇檔案
        fileStatus.textContent = `已選擇: ${selectedFile.name}`;  //更新顯示的文字，使用模板字串
    } else {  //如果使用者沒有選擇檔案
        fileStatus.textContent = "尚未上傳資料";  //顯示尚未上傳資料
    }
}

// 監聽 CSV 檔案輸入欄位的變化
csvFileInput.addEventListener("change", updateFileStatus);

async function updateAnalysisStatus(selectedFile, engineerNote) {  //建立一個函式，名稱為 updateAnalysisStatus;async：表示這個函式裡會有需要等待的非同步操作
    analysisStatus.textContent = "正在進行後端驗證...";  //更新顯示的文字為...

    try {
        const response = await fetch("./api/analysis/validate", {  //fetch()：前端用來發送 HTTP 請求的 API
            method: "POST",  //指定使用 POST 方法
            headers: {
                "Content-Type": "application/json",  //指定傳送的資料格式為 JSON
            },
            body: JSON.stringify({  //將 JavaScript 物件轉換成 JSON 字串
                file_name: selectedFile.name,  //將使用者選擇的檔案名稱傳給後端
                engineer_note: engineerNote,  //將工程師備註傳給後端
            }),
        });

        const data = await response.json();  //response.json()：把 JSON 回應解析成 JavaScript 資料;data：儲存解析完成的資料

        if (!response.ok) {
            throw new Error(data.detail || `HTTP ${response.status}`);  //如果 HTTP 狀態不是 200~299，拋出錯誤，並使用 API 回傳的 detail 訊息
        }

        analysisStatus.textContent = data.message;  //data.message：取得回傳資料中的 message ;將 message 顯示在網頁的分析狀態卡片
        console.log("後端驗證結果：", data);  //將 API 回傳資料顯示在瀏覽器 Console，方便檢查

    } catch (error) {  //catch：接收 try 中發生的錯誤
        console.error("後端驗證失敗：", error);  //將詳細錯誤顯示在 Console，方便開發者除錯
        analysisStatus.textContent = `驗證失敗：${error.message}`;  //在網頁上顯示簡單的失敗訊息
    }
}

analysisForm.addEventListener("submit", function (event) {  //監聽分析表單的提交事件
    event.preventDefault();  //阻止瀏覽器預設表單提交行為並重新整理頁面

    if (!simulatedAccessToken) {  //沒有 Token: 尚未完成身分驗證
        formMessage.textContent = "身分驗證失敗：請先登入 (類似 HTTP 401) ";
        return;
    }

    if (Date.now() >= simulatedAccessToken.exp) {  //Token 過期：登入狀態失效
        simulatedAccessToken = null;
        formMessage.textContent = "登入已過期，請重新登入 (類似 HTTP 401) ";
        return;
    }

    if (simulatedAccessToken.role !== "engineer") {  //已登入但角色不符合
        formMessage.textContent = "權限不足，無法執行分析 (類似 HTTP 403) ";
        return;
    }

    const selectedFile = csvFileInput.files[0];  //取得使用者選擇的第一個檔案

    if (!selectedFile.name.toLowerCase().endsWith(".csv")) {  //如果使用者沒有選擇 CSV 檔案
        formMessage.textContent = "檔案格式錯誤，請選擇 CSV 檔案";  //在網頁上顯示錯誤訊息
        return;
    }

    const engineerNote = engineerNoteInput.value.trim();  //value:取得輸入內容  //trim()：移除文字前後的空白  //取得工程師備註欄位的值，並去除前後空白

    if (engineerNote.length > 0 && engineerNote.length < 5) {  //如果工程師備註欄位有值且長度小於 5
        formMessage.textContent = "工程師備註若有填寫至少需要 5 個字元";  //在網頁上顯示錯誤訊息
        return;
    }

    if(engineerNote) {
        formMessage.textContent = `資料集驗證成功，工程師備註：${engineerNote}`;  //在網頁上顯示工程師備註
    } else {
        formMessage.textContent = "資料集驗證成功，未填寫工程師備註";  //在網頁上顯示未填寫工程師備註
    }
    updateAnalysisStatus(selectedFile, engineerNote);  //呼叫函式，負責在表單驗證成功後，繼續執行原本的 API 測試與更新「分析狀態」卡片
});

const themeButton = document.getElementById("themeButton");  //getElementById("themeButton")：找到剛建立的深色模式按鈕


themeButton.addEventListener("click", function () {  //addEventListener("click", ...)：監聽按鈕點擊
    const darkModeEnabled = document.body.classList.toggle("dark-mode");
    //document.body：取得網頁的 <body>
    //classList.toggle("dark-mode")：若沒有這個 class 就加入；已經有就移除
    //toggle() 會回傳目前是否已經有 dark-mode

    if (darkModeEnabled) {  //if 判斷目前是不是深色模式
        themeButton.textContent = "切換淺色模式";  //textContent 修改按鈕顯示的文字
    } else {
        themeButton.textContent = "切換深色模式";
    }
});

function selectSummaryCard(selectedCard) {  //建立一個函式，名稱為 selectSummaryCard，參數為 selectedCard
    summaryCards.forEach(function (card) {  //forEach()：對陣列中的每個元素執行一次指定的函式
        card.classList.remove("is-selected");  //移除 is-selected class，讓所有卡片恢復原本樣式
    });

    selectedCard.classList.add("is-selected");  //對被點擊的卡片加入 is-selected class，改變樣式
}

summaryCards.forEach(function (card) {  //對每個 summary-card 元素執行以下函式
    card.addEventListener("click", function () {  //監聽每個卡片的點擊事件
        selectSummaryCard(card);  //呼叫 selectSummaryCard 函式，傳入被點擊的卡片
        const statusElement = card.querySelector("p");  //取得目前卡片中 <p> 元素，其 id 對應 API 的 element_id

        if (!statusElement) {  //若卡片中找不到 <p> 元素，顯示警告並停止這次操作

            console.warn("卡片中找不到狀態元素");
            return;
        }

        loadSummaryDetail(statusElement.id);  //使用 <p> 元素的 id 請求該卡片的詳細資料
    });
});

document.addEventListener("DOMContentLoaded", loadSummary);  //DOMContentLoaded：HTML 結構載入完成時觸發
//這個事件發生後，才執行 loadSummary 取得摘要資料