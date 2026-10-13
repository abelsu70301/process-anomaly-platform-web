from fastapi import FastAPI  #FastAPI：建立 Web 應用程式
from fastapi.staticfiles import StaticFiles  #StaticFiles：提供 HTML、CSS、JavaScript 等靜態檔案

app = FastAPI()  #建立名為 app 的應用程式物件

app.mount(  #掛載（掛接）一個子應用程式或服務到指定網址路徑
    "/",  #網站根網址
    StaticFiles(directory="site", html=True),  #directory="site"：網頁檔案放在 site 資料夾;html=True：開啟根網址時，自動尋找 index.html
    name="site"  #替這組靜態檔案服務命名
)  #當使用者訪問 /site 開頭的網址時，把這些請求交給 StaticFiles 處理