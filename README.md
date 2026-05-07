# web4

REST API на Express.js для управления каталогом финансовых продуктов (вклады, кредиты, инвестиции).

## Стек

- Node.js + Express 5
- Хранение данных: JSON-файл (`backend/src/data/products.json`)
- Архитектура: routes → controllers → services

## Структура

```
backend/
├── src/
│   ├── index.js              # точка входа: запуск сервера
│   ├── app.js                # фабрика Express-приложения
│   ├── routes/products.js    # маршруты /products
│   ├── controllers/          # обработчики запросов
│   ├── services/             # бизнес-логика и работа с файлом
│   └── data/products.json    # хранилище
├── tests/
│   ├── unit/                 # unit-тесты сервисов
│   ├── integration/          # тесты API через supertest
│   ├── e2e/                  # сквозной CRUD-сценарий
│   └── helpers/              # общие утилиты для тестов
└── Products_API.postman_collection.json
```

## Эндпоинты

| Метод  | Путь            | Описание              |
|--------|-----------------|-----------------------|
| GET    | `/products`     | Список всех продуктов |
| GET    | `/products/:id` | Продукт по id         |
| POST   | `/products`     | Создать продукт       |
| PATCH  | `/products/:id` | Обновить продукт      |
| DELETE | `/products/:id` | Удалить продукт       |

## Запуск

```bash
cd backend
npm install
npm run dev      # с автоперезапуском (nodemon)
npm start        # production
```

Сервер поднимается на `http://localhost:3000`.

## Тестирование

Использован **Jest** + **Supertest**. Три уровня тестов:

- **Unit** — `productsService` (с замоканным `fileService`) и `fileService` (на временных файлах)
- **Integration** — REST-маршруты через supertest, реальный сервис, временный JSON-файл
- **E2E** — полный пользовательский сценарий: создание → чтение → фильтр → обновление → удаление

```bash
cd backend
npm test                 # все тесты
npm run test:coverage    # с покрытием
npm run test:watch       # watch-режим
```

Покрытие: **97% statements / 100% controllers + routes + productsService**.
