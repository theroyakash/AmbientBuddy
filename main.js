const {BrowserWindow, app} = require('electron');
const path = require('path');

const createMainWindow = () => {
    const window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
            // preload: path.join(__dirname, 'preload.js')
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