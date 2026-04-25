# web4 — ФинансБанк

Учебный проект МГТУ им. Баумана. Одностраничное приложение на ванильном JS с компонентным подходом и Bootstrap 5.

---

## Правки от преподавателя

### 1. Клик на логотип возвращает на главную

**Задание:** при нажатии на «💰 ФинансБанк» в навбаре должна открываться главная страница.

Логотип в `index.html` — это просто `<span>` без ссылки. В точке входа `main.js` навесил обработчик клика, который пересоздаёт и рендерит главную страницу:

```js
// main.js
document.querySelector(".navbar-brand").addEventListener("click", () => {
    const page = new MainPage(root);
    page.render();
});
```

---

### 2. Ползунок для изменения ставки

**Задание:** на странице продукта в блоке «Ставка / доходность» сделать ползунок, которым можно менять отображаемое значение ставки.

В `components/product/index.js` добавил парсинг числового значения из строки ставки и `<input type="range">` рядом с отображаемым значением:

```js
// components/product/index.js
parseRate(rateStr) {
    const match = rateStr.replace(",", ".").match(/[\d.]+/);
    return match ? parseFloat(match[0]) : 10;
}
```

```html
<!-- разметка блока ставки -->
<div class="p-3 bg-light rounded">
    <div class="text-muted small">Ставка / доходность</div>
    <div class="fs-4 fw-bold text-success" id="rate-display-${data.id}">${data.rate}</div>
    <input type="range" class="form-range mt-2" id="rate-slider-${data.id}"
        min="0.1" max="30" step="0.1" value="${initialRate}">
</div>
```

Обработчик события `input` обновляет отображаемое значение в реальном времени:

```js
const slider = document.getElementById(`rate-slider-${data.id}`);
const display = document.getElementById(`rate-display-${data.id}`);
if (slider && display) {
    slider.addEventListener("input", () => {
        const val = parseFloat(slider.value).toFixed(1).replace(".", ",");
        display.textContent = `${val}%`;
    });
}
```

---

### 3. Карусель «Рекомендуем» на главной странице

**Задание:** добавить карусель с карточками продуктов.

Создан новый компонент `components/carousel/index.js` по тому же паттерну, что и остальные компоненты проекта. Карусель построена на Bootstrap Carousel (`data-bs-ride="carousel"`), автопрокрутка каждые 7 секунд:

```html
<!-- carousel/index.js — основная разметка -->
<div id="recommended-carousel" class="carousel slide"
     data-bs-ride="carousel" data-bs-interval="7000">
    <div class="carousel-indicators">...</div>
    <div class="carousel-inner">
        <div class="carousel-item active">
            <div class="row align-items-center bg-light rounded p-4 mx-1">
                <div class="col-md-5">
                    <img src="${item.src}" class="img-fluid rounded shadow-sm" ...>
                </div>
                <div class="col-md-7">
                    <span class="badge bg-secondary mb-2">${item.type}</span>
                    <h3 class="mb-2">${item.title}</h3>
                    <p class="text-muted">${item.shortText}</p>
                    <p><strong class="text-success fs-5">${item.rate}</strong></p>
                    <button class="btn btn-primary"
                            id="carousel-card-${item.id}"
                            data-id="${item.id}">Подробнее</button>
                </div>
            </div>
        </div>
    </div>
    <!-- стрелки в тёмном круге для лучшей видимости -->
    <button class="carousel-control-prev" ...
        style="width:48px;height:48px;background:rgba(0,0,0,0.45);border-radius:50%;">
        <span class="carousel-control-prev-icon"></span>
    </button>
    ...
</div>
```

Кнопка «Подробнее» переиспользует тот же колбэк `clickCard` из `MainPage`, что и карточки в сетке — дополнительной логики навигации не потребовалось:

```js
// pages/main/index.js
const carousel = new CarouselComponent(carouselRoot);
carousel.render(data.slice(0, 5), this.clickCard.bind(this));
```
