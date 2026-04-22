export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="col-md-4 mb-4">
                <div class="card h-100 shadow-sm">
                    <img class="card-img-top" src="${data.src}" alt="${data.title}" style="height: 200px; object-fit: cover;">
                    <div class="card-body d-flex flex-column">
                        <span class="badge bg-secondary align-self-start mb-2">${data.type}</span>
                        <h5 class="card-title">${data.title}</h5>
                        <p class="card-text text-muted">${data.shortText}</p>
                        <p class="card-text mb-3"><strong class="text-success fs-5">${data.rate}</strong></p>
                        <button class="btn btn-primary mt-auto" id="click-card-${data.id}" data-id="${data.id}">
                            Подробнее
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    addListeners(data, listener) {
        document
            .getElementById(`click-card-${data.id}`)
            .addEventListener("click", listener);
    }

    render(data, listener) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML("beforeend", html);
        if (listener) this.addListeners(data, listener);
    }
}
