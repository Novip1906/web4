jest.mock('../../src/services/fileService');

const fileService = require('../../src/services/fileService');
const productsService = require('../../src/services/productsService');

const FAKE_PATH = '/tmp/fake-products.json';

function makeStore(initial) {
    let data = JSON.parse(JSON.stringify(initial));
    fileService.readData.mockImplementation(() => JSON.parse(JSON.stringify(data)));
    fileService.writeData.mockImplementation((_path, next) => {
        data = JSON.parse(JSON.stringify(next));
    });
    return () => data;
}

describe('productsService (unit, mocked fileService)', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        productsService.init(FAKE_PATH);
    });

    describe('findAll', () => {
        test('возвращает все продукты, если фильтр не задан', () => {
            makeStore([
                { id: 1, title: 'Вклад' },
                { id: 2, title: 'Кредит' },
            ]);

            const result = productsService.findAll();

            expect(result).toHaveLength(2);
            expect(fileService.readData).toHaveBeenCalledWith(FAKE_PATH);
        });

        test('фильтрует по подстроке в title без учёта регистра', () => {
            makeStore([
                { id: 1, title: 'Ипотека Семейная' },
                { id: 2, title: 'Кредит наличными' },
                { id: 3, title: 'ИПОТЕКА Военная' },
            ]);

            const result = productsService.findAll('ипотека');

            expect(result.map(p => p.id)).toEqual([1, 3]);
        });

        test('возвращает пустой массив, если ничего не найдено', () => {
            makeStore([{ id: 1, title: 'Вклад' }]);
            expect(productsService.findAll('xyz')).toEqual([]);
        });
    });

    describe('findOne', () => {
        test('возвращает продукт по id (строковый id из URL)', () => {
            makeStore([{ id: 1, title: 'A' }, { id: 2, title: 'B' }]);
            expect(productsService.findOne('2')).toEqual({ id: 2, title: 'B' });
        });

        test('возвращает null, если id не найден', () => {
            makeStore([{ id: 1, title: 'A' }]);
            expect(productsService.findOne(999)).toBeNull();
        });
    });

    describe('create', () => {
        test('создаёт продукт с id = max(id) + 1', () => {
            const store = makeStore([{ id: 5, title: 'X' }, { id: 7, title: 'Y' }]);

            const created = productsService.create({ title: 'New' });

            expect(created.id).toBe(8);
            expect(created.title).toBe('New');
            expect(store()).toHaveLength(3);
            expect(fileService.writeData).toHaveBeenCalledTimes(1);
        });

        test('создаёт продукт с id = 1, если массив пустой', () => {
            makeStore([]);
            const created = productsService.create({ title: 'First' });
            expect(created.id).toBe(1);
        });
    });

    describe('update', () => {
        test('частично обновляет поля и сохраняет id', () => {
            const store = makeStore([{ id: 1, title: 'Old', rate: '5%' }]);

            const updated = productsService.update('1', { title: 'New', id: 999 });

            expect(updated).toEqual({ id: 1, title: 'New', rate: '5%' });
            expect(store()[0]).toEqual({ id: 1, title: 'New', rate: '5%' });
        });

        test('возвращает null, если продукт не найден', () => {
            makeStore([{ id: 1 }]);
            expect(productsService.update('42', { title: 'X' })).toBeNull();
            expect(fileService.writeData).not.toHaveBeenCalled();
        });
    });

    describe('remove', () => {
        test('удаляет продукт и возвращает true', () => {
            const store = makeStore([{ id: 1 }, { id: 2 }]);

            expect(productsService.remove('1')).toBe(true);
            expect(store()).toEqual([{ id: 2 }]);
        });

        test('возвращает false, если продукт не найден', () => {
            makeStore([{ id: 1 }]);
            expect(productsService.remove('42')).toBe(false);
            expect(fileService.writeData).not.toHaveBeenCalled();
        });
    });
});
