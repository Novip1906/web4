import { CarouselComponent } from "../../components/carousel/index.js";
import { ProductCardComponent } from "../../components/product-card/index.js";
import { ToastComponent } from "../../components/toast/index.js";
import { ProductPage } from "../product/index.js";
import { ajax } from "../../modules/ajax.js";
import { stockUrls } from "../../modules/stockUrls.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.title = "";
    }

    get pageRoot() {
        return document.getElementById("main-page");
    }

    getHTML() {
        return `
            <div id="main-page">
                <h1 class="mb-3">Финансовые продукты</h1>
                <p class="text-muted mb-4">Выберите подходящий продукт и откройте его онлайн за несколько минут. Нажмите на карточку, чтобы посмотреть подробные условия.</p>
                <div id="carousel-root"></div>
                <div class="row mb-4">
                    <div class="col-md-6">
                        <div class="input-group">
                            <span class="input-group-text">🔍</span>
                            <input type="text" id="filter-input" class="form-control" placeholder="Поиск по названию..." value="${this.title}">
                            <button class="btn btn-outline-secondary" id="filter-clear" type="button">Сбросить</button>
                        </div>
                    </div>
                </div>
                <div id="status" class="text-muted mb-3"></div>
                <div id="cards-row" class="row"></div>
            </div>
        `;
    }

    showToast(payload) {
        const container = document.getElementById("toast-container");
        const toast = new ToastComponent(container);
        toast.show(payload);
    }

    setStatus(text) {
        const el = document.getElementById("status");
        if (el) el.textContent = text;
    }

    clickCard(e) {
        const cardId = Number(e.currentTarget.dataset.id);
        const productPage = new ProductPage(this.parent, cardId);
        productPage.render();
    }

    async deleteCard(e) {
        e.stopPropagation();
        const cardId = Number(e.currentTarget.dataset.id);
        if (!confirm("Удалить эту карточку?")) return;

        try {
            await ajax.delete(stockUrls.removeStockById(cardId));
            this.showToast({ title: "Удалено", text: `Карточка #${cardId} удалена`, variant: "success" });
            await this.getData();
        } catch (err) {
            this.showToast({ title: "Ошибка", text: `Статус ${err.status ?? "—"}`, variant: "danger" });
        }
    }

    async getData() {
        const params = this.title ? { title: this.title } : {};
        this.setStatus("Загрузка...");
        try {
            const data = await ajax.get(stockUrls.getStocks(params));
            this.renderData(data || []);
        } catch (err) {
            this.setStatus(`Ошибка загрузки: статус ${err.status ?? "—"}`);
            this.showToast({ title: "Ошибка", text: `Статус ${err.status ?? "—"}`, variant: "danger" });
        }
    }

    renderData(items) {
        const cardsRow = document.getElementById("cards-row");
        const carouselRoot = document.getElementById("carousel-root");
        cardsRow.innerHTML = "";
        carouselRoot.innerHTML = "";

        if (items.length === 0) {
            this.setStatus("Ничего не найдено");
            return;
        }
        this.setStatus(`Найдено: ${items.length}`);

        if (!this.title) {
            const carousel = new CarouselComponent(carouselRoot);
            carousel.render(items.slice(0, Math.min(5, items.length)), this.clickCard.bind(this));
        }

        items.forEach((item) => {
            const productCard = new ProductCardComponent(cardsRow);
            productCard.render(item, this.clickCard.bind(this), this.deleteCard.bind(this));
        });
    }

    addFilterListeners() {
        const input = document.getElementById("filter-input");
        const clearBtn = document.getElementById("filter-clear");

        let timer;
        input.addEventListener("input", (e) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                this.title = e.target.value.trim();
                this.getData();
            }, 300);
        });

        clearBtn.addEventListener("click", () => {
            input.value = "";
            this.title = "";
            this.getData();
        });
    }

    render() {
        this.parent.innerHTML = "";
        const html = this.getHTML();
        this.parent.insertAdjacentHTML("beforeend", html);
        this.addFilterListeners();
        this.getData();
    }
}
