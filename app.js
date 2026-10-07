const startButton = document.getElementById("startButton");  
//const：建立一個不會重新指定的變數
//startButton：我們替這個變數取的名稱
//document：代表目前這份 HTML 網頁
//getElementById(...)：依照 id 尋找 HTML 元素
//"startButton"：對應按鈕的 id="startButton"

startButton.addEventListener("click", function() {
    alert("分析功能準備中");
});
//當 startButton 被點擊時，顯示「分析功能準備中！」