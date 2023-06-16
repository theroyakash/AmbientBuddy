const {BrowserWindow, app} = require('electron');
const path = require('path');

const createMainWindow = () => {
    const window = new BrowserWindow({
        title: "AmbientBuddy",
        width: 1100,
        height: 900,
        webPreferences: {
            nodeIntegration: true
        }
    })

    window.loadFile("index.html");
}

app.whenReady().then(() => {
    createMainWindow();
});

// app.on('window-all-closed', () => {
//     if (process.platform !== 'darwin') {
//         app.quit();
//     }
// })