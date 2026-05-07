const request = require('supertest');
const { createApp } = require('../../src/app');
const productsService = require('../../src/services/productsService');
const { createTempFile, cleanup } = require('../helpers/tempData');

describe('Products E2E flow (создание → чтение → обновление → удаление)', () => {
    let app;
    let tempDir;

    beforeAll(() => {
        const t = createTempFile([]);
        tempDir = t.dir;
        productsService.init(t.filePath);
        app = createApp();
    });

    afterAll(() => cleanup(tempDir));

    let createdId;

    test('1. список изначально пуст', async () => {
        const res = await request(app).get('/products');
        expect(res.status).toBe(200);
        expect(res.body).toEqual([]);
    });

    test('2. создаём новый продукт', async () => {
        const res = await request(app)
            .post('/products')
            .send({
                src: 'https://example.com/e2e.jpg',
                title: 'E2E продукт',
                text: 'Полное описание',
                rate: '9%',
            });

        expect(res.status).toBe(201);
        expect(res.body.id).toBeGreaterThan(0);
        createdId = res.body.id;
    });

    test('3. продукт появился в списке', async () => {
        const res = await request(app).get('/products');
        expect(res.body).toHaveLength(1);
        expect(res.body[0].id).toBe(createdId);
    });

    test('4. можем получить продукт по id', async () => {
        const res = await request(app).get(`/products/${createdId}`);
        expect(res.status).toBe(200);
        expect(res.body.title).toBe('E2E продукт');
    });

    test('5. фильтр по title находит продукт', async () => {
        const res = await request(app).get('/products?title=e2e');
        expect(res.body).toHaveLength(1);
    });

    test('6. обновляем title', async () => {
        const res = await request(app)
            .patch(`/products/${createdId}`)
            .send({ title: 'E2E продукт (обновлён)' });

        expect(res.status).toBe(200);
        expect(res.body.title).toBe('E2E продукт (обновлён)');
    });

    test('7. при чтении видим обновлённое значение', async () => {
        const res = await request(app).get(`/products/${createdId}`);
        expect(res.body.title).toBe('E2E продукт (обновлён)');
    });

    test('8. удаляем продукт', async () => {
        const res = await request(app).delete(`/products/${createdId}`);
        expect(res.status).toBe(204);
    });

    test('9. список снова пуст', async () => {
        const res = await request(app).get('/products');
        expect(res.body).toEqual([]);
    });

    test('10. повторное удаление возвращает 404', async () => {
        const res = await request(app).delete(`/products/${createdId}`);
        expect(res.status).toBe(404);
    });
});
