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

async function updateAnalysisStatus() {  //建立一個函式，名稱為 updateAnalysisStatus;async：表示這個函式裡會有需要等待的非同步操作
    analysisStatus.textContent = "正在測試 API 連線...";  //更新顯示的文字為...

    try {
        const response = await fetch(  //fetch()：向公開 API 發送 GET Request
            "https://jsonplaceholder.typicode.com/todos/1"
        );

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();  //response.json()：把 JSON 回應解析成 JavaScript 資料;data：儲存解析完成的資料

        console.log(data);  //將 API 回傳資料顯示在瀏覽器 Console，方便檢查
        analysisStatus.textContent = `API 連線成功：${data.title}`;   //data.title：取得回傳資料中的 title ;將 title 顯示在網頁的分析狀態卡片
    } catch (error) {  //catch：接收 try 中發生的錯誤
        console.error("API 請求失敗：", error);  //將詳細錯誤顯示在 Console，方便開發者除錯
        analysisStatus.textContent = "API 連線失敗";  //在網頁上顯示簡單的失敗訊息
    }
}

startButton.addEventListener("click", updateAnalysisStatus);  //監聽按鈕點擊事件，觸發 updateAnalysisStatus 函式

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
    });
});
