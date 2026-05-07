const fs = require('fs');
const path = require('path');
const os = require('os');
const fileService = require('../../src/services/fileService');

describe('fileService (unit)', () => {
    let tempDir;
    let filePath;

    beforeEach(() => {
        tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'web4-fs-'));
        filePath = path.join(tempDir, 'data.json');
    });

    afterEach(() => {
        fs.rmSync(tempDir, { recursive: true, force: true });
    });

    test('readData возвращает массив, записанный writeData', () => {
        const data = [{ id: 1, title: 'A' }, { id: 2, title: 'B' }];
        fileService.writeData(filePath, data);

        const result = fileService.readData(filePath);

        expect(result).toEqual(data);
    });

    test('readData возвращает пустой массив, если файл отсутствует', () => {
        const result = fileService.readData(path.join(tempDir, 'nope.json'));
        expect(result).toEqual([]);
    });

    test('readData возвращает пустой массив, если JSON битый', () => {
        fs.writeFileSync(filePath, '{ это не JSON', 'utf-8');
        const result = fileService.readData(filePath);
        expect(result).toEqual([]);
    });

    test('writeData сохраняет в формате JSON с отступами', () => {
        fileService.writeData(filePath, [{ id: 1 }]);
        const raw = fs.readFileSync(filePath, 'utf-8');
        expect(raw).toContain('\n');
        expect(JSON.parse(raw)).toEqual([{ id: 1 }]);
    });
});
