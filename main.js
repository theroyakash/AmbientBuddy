const { BrowserWindow, app } = require('electron');

let mainWindow;

const createMainWindow = () => {
    mainWindow = new BrowserWindow({
        title: "AmbientBuddy",
        width: 1600,
        height: 1750,
        resizable: true,
        webPreferences: {
            nodeIntegration: true,
        }
    })

    mainWindow.loadFile("index.html");
}

app.whenReady().then(() => {
    createMainWindow();
});

app.on('window-all-closed', () => {
    app.quit();
})