const fs = require('fs');
const path = require('path');
const os = require('os');

function getDocumentsPath() {
    switch (process.platform) {
        case 'win32':
            return path.join(os.homedir(), 'Documents'); // Windows path
        case 'darwin':
            return path.join(os.homedir(), 'Documents'); // macOS path
        case 'linux':
            return path.join(os.homedir(), 'Documents'); // Linux path (if needed)
        default:
            throw new Error('Unsupported platform');
    }
}

const documentsPath = getDocumentsPath();
const filePath = path.join(documentsPath, 'AmbientBuddy.json');

function saveJsonData(data) {
    try {
        const jsonData = JSON.stringify(data, null, 2); // Pretty-print JSON
        fs.writeFileSync(filePath, jsonData, 'utf8');
        console.log('Data successfully saved to', filePath);
    } catch (error) {
        console.error('Error saving JSON:', error);
    }
}

function loadJsonData() {
    try {
        if (!fs.existsSync(filePath)) {
            console.log('File does not exist:', filePath);
            return null;
        }

        const jsonData = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(jsonData);
    } catch (error) {
        console.error('Error reading JSON:', error);
        return null;
    }
}

const myData = {
    name: "John Doe",
    age: 30,
    job: "Software Engineer"
};

module.exports = {
    myData,
    saveJsonData,
    loadJsonData
};