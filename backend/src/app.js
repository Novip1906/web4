const express = require('express');
const productsRouter = require('./routes/products');

function createApp() {
    const app = express();

    app.use(express.json());

    app.use((req, res, next) => {
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
        next();
    });

    app.use('/products', productsRouter);

    app.use((req, res) => {
        res.status(404).json({ error: 'Маршрут не найден' });
    });

    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    });

    return app;
}

module.exports = { createApp };
