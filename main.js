const {BrowserWindow, app } = require('electron');
const storage = require('./storage');

let mainWindow;

const createMainWindow = () => {
    mainWindow = new BrowserWindow({
        title: "AmbientBuddy",
        width: 1400,
        height: 900,
        webPreferences: {
            nodeIntegration: true
        }
    })

    mainWindow.loadFile("index.html");
    let data = storage.myData;
    console.log(data);
    storage.saveJsonData(data);
}

app.whenReady().then(() => {
    createMainWindow();
});

app.on('window-all-closed', () => {
    app.quit();
})