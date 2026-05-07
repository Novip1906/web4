import { BackButtonComponent } from "../../components/back-button/index.js";
import { ProductComponent } from "../../components/product/index.js";
import { ToastComponent } from "../../components/toast/index.js";
import { MainPage } from "../main/index.js";
import { ajax } from "../../modules/ajax.js";
import { stockUrls } from "../../modules/stockUrls.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
    }

    get pageRoot() {
        return document.getElementById("product-page");
    }

    getHTML() {
        return '<div id="product-page"></div>';
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    showToast(payload) {
        const container = document.getElementById("toast-container");
        const toast = new ToastComponent(container);
        toast.show(payload);
    }

    async getData() {
        try {
            const data = await ajax.get(stockUrls.getStockById(this.id));
            this.renderData(data);
        } catch (err) {
            this.pageRoot.insertAdjacentHTML(
                "beforeend",
                `<div class="alert alert-danger">Не удалось загрузить продукт: статус ${err.status ?? "—"}</div>`
            );
            this.showToast({ title: "Ошибка", text: `Статус ${err.status ?? "—"}`, variant: "danger" });
        }
    }

    renderData(item) {
        const product = new ProductComponent(this.pageRoot);
        product.render(item);
    }

    render() {
        this.parent.innerHTML = "";
        const html = this.getHTML();
        this.parent.insertAdjacentHTML("beforeend", html);

        const backButton = new BackButtonComponent(this.pageRoot);
        backButton.render(this.clickBack.bind(this));

        this.getData();
    }
}
