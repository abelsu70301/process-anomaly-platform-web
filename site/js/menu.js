const sidebarToggle = document.getElementById("sidebarToggle");  //左上角按鈕
const sidebar = document.getElementById("sidebar");  //側邊欄
const loginSection = document.getElementById("login");
const analysisSection = document.getElementById("analysis");

//建立共用函式
function setSidebarOpen(open) {  //opem是自訂參數名稱，呼叫時傳入true:展開;false:收合
    sidebar.classList.toggle("is-open", open);  //toggle有兩個參數true.false
    document.body.classList.toggle("sidebar-open", open);  //讓整個頁面同步知道選單是否展開
    sidebar.inert = !open;  //跟open狀態相反，若open為true，取消insert，變可以操作
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

function showCurrentSection() {
    const isAnalysis = window.location.hash === "#analysis";

    loginSection.hidden = isAnalysis;
    analysisSection.hidden = !isAnalysis;
}

window.addEventListener("hashchange", showCurrentSection);
showCurrentSection();