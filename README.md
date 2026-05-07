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
│   ├── index.js              # точка входа, настройка сервера
│   ├── routes/products.js    # маршруты /products
│   ├── controllers/          # обработчики запросов
│   ├── services/             # бизнес-логика и работа с файлом
│   └── data/products.json    # хранилище
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
