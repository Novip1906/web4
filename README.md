# web4

Лабораторные работы по веб-программированию.

## ЛР6 — Promise, Fetch и сборка фронтенда

Фронтенд из ЛР5 переведён с `XMLHttpRequest` на `fetch` (с `async/await`),
собирается через **Vite** и раздаётся бэкендом как статика — поэтому в продакшн-режиме
CORS-ошибок нет (один и тот же origin `http://localhost:3000`).

### Структура

- `backend/` — Express REST API на `http://localhost:3000`. Дополнительно раздаёт собранный
  фронтенд из `backend/public/` через `express.static`.
- `frontend/` — клиент на чистом JS + Bootstrap 5, собирается через Vite.
  - `frontend/modules/promiseDemo.js` — демонстрация Promise (`then/catch/finally`) и `async/await`.
  - `frontend/modules/ajax.js` — обёртка над `fetch` (`get`/`post`/`patch`/`delete`),
    возвращает промисы.
  - `frontend/modules/stockUrls.js` — URL-эндпоинты API (по умолчанию относительные).
  - `frontend/vite.config.js` — конфиг Vite: `outDir: ./public`, dev-прокси `/products → localhost:3000`.

### Вариант

Реализован **вариант 1**: фильтрация карточек по названию (`GET /products?title=...`)
и удаление карточки (`DELETE /products/:id`).

### Запуск

#### Через Docker Compose (production-режим)

```sh
docker compose up --build
```

Multi-stage Dockerfile в `backend/Dockerfile` собирает фронт через Vite, копирует
готовый `public/` в образ бэкенда и запускает один сервис на порту 3000.
Файл `backend/src/data/products.json` смонтирован как том.

Открыть `http://localhost:3000/`.

#### Локально, dev-режим (с hot-reload фронта)

```sh
# терминал 1 — бэкенд (API + статика)
cd backend && npm install && npm start
# http://localhost:3000

# терминал 2 — фронтенд (Vite dev-server, hot-reload)
cd frontend && npm install && npm run dev
# http://localhost:5173 (запросы к /products проксируются на :3000)
```

#### Локально, production-режим (один сервер)

```sh
cd frontend && npm install && npm run build
cp -r frontend/public backend/public

cd backend && npm install && npm start
```

Открыть `http://localhost:3000/`.

### Демо Promise

При загрузке страницы `frontend/modules/promiseDemo.js` выводит в консоль браузера
два примера: один через `then/catch/finally`, другой через `async/await` с `try/catch`.

## ЛР5 — AJAX (XMLHttpRequest)

См. ветку `lab5`.
