# web4 — hw2: 3D Gallery (GLB)

Интерактивная веб-галерея для предпросмотра 3D-моделей в формате GLB. Реализовано
по тьюториалу [iu5git/JavaScript/tutorials/threejs](https://github.com/iu5git/JavaScript/tree/main/tutorials/threejs).

## Запуск

```bash
python3 -m http.server 5500
```

Открыть [http://localhost:5500/](http://localhost:5500/).

## Структура

```
.
├── index.html        # главная страница (галерея)
├── detail.html       # страница детального просмотра
├── app.js            # логика галереи + превью в canvas
├── detail.js         # OrbitControls, кнопки зума и ракурсов
├── idb.js            # IndexedDB-обёртка (пользовательские модели)
├── styles.css        # сетка карточек 4×N
└── models/           # GLB-модели
    ├── Duck.glb
    ├── Fox.glb
    ├── DamagedHelmet.glb
    ├── Avocado.glb
    └── BoxAnimated.glb
```

## Возможности

- Сетка превью моделей 4 в ряд, рендер в режиме single-frame через WebGLRenderer.
- Загрузка собственных `.glb`-файлов (хранятся в IndexedDB браузера).
- Парная карточка (две модели в одной сцене с отступом).
- Детальный просмотр: вращение мышью (OrbitControls), кнопки `+`/`−` для зума,
  кнопки «Спереди / Сзади / Слева / Справа» для смены ракурса.
- Автоматическое центрирование моделей по основанию (Box3 → low.y → 0).

## Технологии

- Three.js 0.160.0 через `<script type="importmap">` (CDN unpkg).
- GLTFLoader, OrbitControls из `examples/jsm`.
- IndexedDB через нативный API.
- Чистый CSS, без фреймворков.

Модели взяты из [Khronos glTF Sample Assets](https://github.com/KhronosGroup/glTF-Sample-Assets).
