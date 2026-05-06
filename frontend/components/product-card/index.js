export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="col-md-4 mb-4" id="card-wrapper-${data.id}">
                <div class="card h-100 shadow-sm">
                    <img class="card-img-top" src="${data.src}" alt="${data.title}" style="height: 200px; object-fit: cover;">
                    <div class="card-body d-flex flex-column">
                        <span class="badge bg-secondary align-self-start mb-2">${data.type}</span>
                        <h5 class="card-title">${data.title}</h5>
                        <p class="card-text text-muted">${data.shortText}</p>
                        <p class="card-text mb-3"><strong class="text-success fs-5">${data.rate}</strong></p>
                        <div class="mt-auto d-flex gap-2">
                            <button class="btn btn-primary flex-grow-1" id="click-card-${data.id}" data-id="${data.id}">
                                Подробнее
                            </button>
                            <button class="btn btn-outline-danger" id="delete-card-${data.id}" data-id="${data.id}" title="Удалить">
                                ✕
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    addListeners(data, openListener, deleteListener) {
        document
            .getElementById(`click-card-${data.id}`)
            .addEventListener("click", openListener);
        if (deleteListener) {
            document
                .getElementById(`delete-card-${data.id}`)
                .addEventListener("click", deleteListener);
        }
    }

    render(data, openListener, deleteListener) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML("beforeend", html);
        if (openListener) this.addListeners(data, openListener, deleteListener);
    }
}
