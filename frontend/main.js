import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { MainPage } from "./pages/main/index.js";
import { runPromiseDemo } from "./modules/promiseDemo.js";

runPromiseDemo();

const root = document.getElementById("root");
const mainPage = new MainPage(root);
mainPage.render();

document.querySelector(".navbar-brand").addEventListener("click", () => {
    const page = new MainPage(root);
    page.render();
});
