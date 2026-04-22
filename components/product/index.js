import { ToastComponent } from "../toast/index.js";

export class ProductComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="row">
                <div class="col-md-5 mb-4">
                    <img src="${data.src}" class="img-fluid rounded shadow" alt="${data.title}">
                </div>
                <div class="col-md-7">
                    <span class="badge bg-secondary mb-2">${data.type}</span>
                    <h2 class="mb-3">${data.title}</h2>
                    <p class="lead">${data.text}</p>

                    <div class="row text-center my-4">
                        <div class="col">
                            <div class="p-3 bg-light rounded">
                                <div class="text-muted small">Ставка / доходность</div>
                                <div class="fs-4 fw-bold text-success">${data.rate}</div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="p-3 bg-light rounded">
                                <div class="text-muted small">Сумма</div>
                                <div class="fs-6 fw-bold">${data.minAmount}</div>
                            </div>
                        </div>
                    </div>

                    <ul class="list-group list-group-flush mb-4">
                        <li class="list-group-item d-flex justify-content-between">
                            <span class="text-muted">Срок</span><span>${data.term}</span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between">
                            <span class="text-muted">Валюта</span><span>${data.currency}</span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between">
                            <span class="text-muted">Уровень риска</span><span>${data.risk}</span>
                        </li>
                    </ul>

                    <h5 class="mb-3">Получить информацию</h5>
                    <div class="d-flex flex-wrap gap-2">
                        <button class="btn btn-success" id="toast-rate-${data.id}" data-key="rate">
                            Текущая ставка
                        </button>
                        <button class="btn btn-warning" id="toast-promo-${data.id}" data-key="promo">
                            Акции и бонусы
                        </button>
                        <button class="btn btn-info text-white" id="toast-info-${data.id}" data-key="info">
                            Условия
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    addListeners(data) {
        const toastContainer = document.getElementById("toast-container");
        const toast = new ToastComponent(toastContainer);

        ["rate", "promo", "info"].forEach((key) => {
            const btn = document.getElementById(`toast-${key}-${data.id}`);
            if (btn) {
                btn.addEventListener("click", () => {
                    toast.show(data.toast[key]);
                });
            }
        });
    }

    render(data) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML("beforeend", html);
        this.addListeners(data);
    }
}
