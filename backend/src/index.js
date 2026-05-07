const path = require('path');
const { createApp } = require('./app');
const productsService = require('./services/productsService');

const PORT = 3000;
const dataFilePath = path.join(__dirname, 'data', 'products.json');

productsService.init(dataFilePath);

const app = createApp();

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Сервер запущен на http://localhost:${PORT}`);
    });
}

module.exports = app;
