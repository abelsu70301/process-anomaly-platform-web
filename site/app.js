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
        const response = await fetch("./api/analysis/validate", {  //fetch()：向公開 API 發送 GET Request
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