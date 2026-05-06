# web4

Лабораторные работы по веб-программированию.

## ЛР5 — AJAX

Фронтенд из ЛР3 + бэкенд из ЛР4, связанные через `XMLHttpRequest`.

### Структура

- `backend/` — Express REST API на `http://localhost:3000` (с CORS).
- `frontend/` — статический фронтенд (Bootstrap 5) на `http://localhost:5500`.
  - `frontend/modules/stockUrls.js` — класс с URL-эндпоинтами API.
  - `frontend/modules/ajax.js` — обёртка над `XMLHttpRequest` (`get`/`post`/`patch`/`delete`).

### Вариант

Реализован **вариант 1**: фильтрация карточек по названию (`GET /products?title=...`) и удаление карточки (`DELETE /products/:id`).

### Запуск

#### Через Docker Compose

```sh
docker compose up --build
```

Файл `backend/src/data/products.json` смонтирован как том, поэтому изменения переживают перезапуск контейнеров.

#### Локально (без Docker)

```sh
# терминал 1 — бэкенд
cd backend && npm install && npm start

# терминал 2 — фронтенд
cd frontend && npm install && npm start
```

Открыть `http://localhost:5500/`.
