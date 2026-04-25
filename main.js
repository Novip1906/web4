import { MainPage } from "./pages/main/index.js";

const root = document.getElementById("root");
const mainPage = new MainPage(root);
mainPage.render();

document.querySelector(".navbar-brand").addEventListener("click", () => {
    const page = new MainPage(root);
    page.render();
});
