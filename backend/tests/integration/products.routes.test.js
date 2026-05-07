const request = require('supertest');
const { createApp } = require('../../src/app');
const productsService = require('../../src/services/productsService');
const { createTempFile, cleanup, SAMPLE_PRODUCTS } = require('../helpers/tempData');

describe('Products API (integration: routes + controller + service + real file)', () => {
    let app;
    let tempDir;

    beforeEach(() => {
        const t = createTempFile(SAMPLE_PRODUCTS);
        tempDir = t.dir;
        productsService.init(t.filePath);
        app = createApp();
    });

    afterEach(() => cleanup(tempDir));

    test('GET /products возвращает все продукты', async () => {
        const res = await request(app).get('/products');

        expect(res.status).toBe(200);
        expect(res.body).toHaveLength(2);
        expect(res.body[0]).toHaveProperty('title');
    });

    test('GET /products?title=кредит фильтрует по подстроке', async () => {
        const res = await request(app).get('/products?title=кредит');

        expect(res.status).toBe(200);
        expect(res.body).toHaveLength(1);
        expect(res.body[0].id).toBe(2);
    });

    test('GET /products/:id возвращает продукт', async () => {
        const res = await request(app).get('/products/1');

        expect(res.status).toBe(200);
        expect(res.body.id).toBe(1);
        expect(res.body.title).toBe('Вклад «Тест»');
    });

    test('GET /products/:id возвращает 404 для несуществующего id', async () => {
        const res = await request(app).get('/products/999');

        expect(res.status).toBe(404);
        expect(res.body.error).toBe('Продукт не найден');
    });

    test('POST /products создаёт продукт', async () => {
        const payload = {
            src: 'https://example.com/new.jpg',
            title: 'Новый продукт',
            text: 'Описание нового продукта',
        };

        const res = await request(app).post('/products').send(payload);

        expect(res.status).toBe(201);
        expect(res.body).toMatchObject(payload);
        expect(res.body.id).toBe(3);

        const list = await request(app).get('/products');
        expect(list.body).toHaveLength(3);
    });

    test('POST /products возвращает 400, если не все поля заполнены', async () => {
        const res = await request(app)
            .post('/products')
            .send({ title: 'Только title' });

        expect(res.status).toBe(400);
        expect(res.body.error).toBe('Не все поля заполнены');
    });

    test('PATCH /products/:id обновляет поля', async () => {
        const res = await request(app)
            .patch('/products/1')
            .send({ title: 'Обновлённый заголовок' });

        expect(res.status).toBe(200);
        expect(res.body.title).toBe('Обновлённый заголовок');
        expect(res.body.id).toBe(1);

        const fetched = await request(app).get('/products/1');
        expect(fetched.body.title).toBe('Обновлённый заголовок');
    });

    test('PATCH /products/:id возвращает 404, если продукт не найден', async () => {
        const res = await request(app)
            .patch('/products/999')
            .send({ title: 'X' });

        expect(res.status).toBe(404);
    });

    test('DELETE /products/:id удаляет продукт', async () => {
        const res = await request(app).delete('/products/1');

        expect(res.status).toBe(204);

        const list = await request(app).get('/products');
        expect(list.body).toHaveLength(1);
        expect(list.body[0].id).toBe(2);
    });

    test('DELETE /products/:id возвращает 404, если продукт не найден', async () => {
        const res = await request(app).delete('/products/999');
        expect(res.status).toBe(404);
    });

    test('GET на неизвестный маршрут возвращает 404', async () => {
        const res = await request(app).get('/unknown');
        expect(res.status).toBe(404);
        expect(res.body.error).toBe('Маршрут не найден');
    });
});
