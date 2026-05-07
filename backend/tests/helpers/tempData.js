const fs = require('fs');
const os = require('os');
const path = require('path');

const SAMPLE_PRODUCTS = [
    {
        id: 1,
        type: 'Вклад',
        src: 'https://example.com/1.jpg',
        title: 'Вклад «Тест»',
        shortText: 'Короткое описание',
        text: 'Полное описание вклада',
        rate: '10%',
        minAmount: '1 000 ₽',
        term: '12 мес',
        currency: '₽',
        risk: 'Низкий',
    },
    {
        id: 2,
        type: 'Кредит',
        src: 'https://example.com/2.jpg',
        title: 'Кредит «Тест»',
        shortText: 'Короткое описание',
        text: 'Полное описание кредита',
        rate: '12%',
        minAmount: '100 000 ₽',
        term: '5 лет',
        currency: '₽',
        risk: '—',
    },
];

function createTempFile(initial = SAMPLE_PRODUCTS) {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'web4-tests-'));
    const filePath = path.join(dir, 'products.json');
    fs.writeFileSync(filePath, JSON.stringify(initial, null, 2), 'utf-8');
    return { filePath, dir };
}

function cleanup(dir) {
    if (dir && fs.existsSync(dir)) {
        fs.rmSync(dir, { recursive: true, force: true });
    }
}

module.exports = { SAMPLE_PRODUCTS, createTempFile, cleanup };
