export class CarouselComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(items) {
        const indicators = items
            .map(
                (item, idx) => `
                    <button type="button"
                        data-bs-target="#recommended-carousel"
                        data-bs-slide-to="${idx}"
                        class="${idx === 0 ? "active" : ""}"
                        ${idx === 0 ? 'aria-current="true"' : ""}
                        aria-label="Слайд ${idx + 1}"></button>
                `
            )
            .join("");

        const slides = items
            .map(
                (item, idx) => `
                    <div class="carousel-item ${idx === 0 ? "active" : ""}">
                        <div class="row align-items-center bg-light rounded p-4 mx-1">
                            <div class="col-md-5 mb-3 mb-md-0">
                                <img src="${item.src}" class="img-fluid rounded shadow-sm" alt="${item.title}" style="max-height: 260px; width: 100%; object-fit: cover;">
                            </div>
                            <div class="col-md-7">
                                <span class="badge bg-secondary mb-2">${item.type}</span>
                                <h3 class="mb-2">${item.title}</h3>
                                <p class="text-muted">${item.shortText}</p>
                                <p class="mb-3"><strong class="text-success fs-5">${item.rate}</strong></p>
                                <button class="btn btn-primary" id="carousel-card-${item.id}" data-id="${item.id}">
                                    Подробнее
                                </button>
                            </div>
                        </div>
                    </div>
                `
            )
            .join("");

        return `
            <section class="mb-5">
                <h2 class="mb-3">Рекомендуем</h2>
                <div id="recommended-carousel" class="carousel slide" data-bs-ride="carousel" data-bs-interval="7000">
                    <div class="carousel-indicators">
                        ${indicators}
                    </div>
                    <div class="carousel-inner">
                        ${slides}
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#recommended-carousel" data-bs-slide="prev"
                        style="width: 48px; height: 48px; top: 50%; transform: translateY(-50%); background: rgba(0,0,0,0.45); border-radius: 50%; left: 12px;">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Назад</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#recommended-carousel" data-bs-slide="next"
                        style="width: 48px; height: 48px; top: 50%; transform: translateY(-50%); background: rgba(0,0,0,0.45); border-radius: 50%; right: 12px;">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Вперёд</span>
                    </button>
                </div>
            </section>
        `;
    }

    addListeners(items, listener) {
        items.forEach((item) => {
            const btn = document.getElementById(`carousel-card-${item.id}`);
            if (btn) btn.addEventListener("click", listener);
        });
    }

    render(items, listener) {
        const html = this.getHTML(items);
        this.parent.insertAdjacentHTML("beforeend", html);
        if (listener) this.addListeners(items, listener);
    }
}
