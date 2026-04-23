const fs = require('fs');

function readData(filePath) {
    try {
        const raw = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(raw);
    } catch (e) {
        console.error('Ошибка чтения файла:', e.message);
        return [];
    }
}

function writeData(filePath, data) {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (e) {
        console.error('Ошибка записи файла:', e.message);
    }
}

module.exports = { readData, writeData };
