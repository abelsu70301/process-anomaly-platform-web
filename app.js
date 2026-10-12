const startButton = document.getElementById("startButton");  
//const：建立一個不會重新指定的變數
//startButton：我們替這個變數取的名稱
//document：代表目前這份 HTML 網頁
//getElementById(...)：依照 id 尋找 HTML 元素
//"startButton"：對應按鈕的 id="startButton"

startButton.addEventListener("click", function() {
    alert("分析功能準備中");
});
//addEventListener：監聽使用者的操作
//"click"：要監聽的事件是「點擊」
//function () { ... }：按鈕被點擊後，要執行的程式
//alert(...)：顯示瀏覽器提示視窗
//當 startButton 
