import { ProductCardComponent } from "../../components/product-card/index.js";
import { ProductPage } from "../product/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    get pageRoot() {
        return document.getElementById("main-page");
    }

    getHTML() {
        return `
            <div id="main-page">
                <h1 class="mb-3">Финансовые продукты</h1>
                <p class="text-muted mb-4">Выберите подходящий вклад, кредит или инвестиционный продукт. Нажмите на карточку, чтобы посмотреть подробные условия.</p>
                <div id="cards-row" class="row"></div>
            </div>
        `;
    }

    getData() {
        return [
            {
                id: 1,
                type: "Вклад",
                src: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?w=800",
                title: "Вклад «Накопительный»",
                shortText: "Классический срочный вклад с капитализацией процентов.",
                text: "Надёжный депозит с фиксированной ставкой на весь срок. Начисленные проценты ежемесячно прибавляются к сумме вклада и увеличивают доходность.",
                rate: "14,5%",
                minAmount: "10 000 ₽",
                term: "от 3 до 36 месяцев",
                currency: "₽ / $ / €",
                risk: "Низкий",
                toast: {
                    rate: { title: "Ставка обновлена", text: "Текущая ставка по вкладу «Накопительный» — 14,5% годовых.", variant: "success" },
                    promo: { title: "Акция", text: "При открытии онлайн +0,5% к ставке. Действует до 30 апреля.", variant: "warning" },
                    info: { title: "Условия вклада", text: "Пополнение без ограничений, частичное снятие — до 50% остатка.", variant: "info" }
                }
            },
            {
                id: 2,
                type: "Кредит",
                src: "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=800",
                title: "Ипотека «Семейная»",
                shortText: "Льготная ипотека для семей с детьми с господдержкой.",
                text: "Программа жилищного кредитования с государственной поддержкой для семей с одним и более детьми. Минимальный первоначальный взнос и увеличенные сроки.",
                rate: "6,0%",
                minAmount: "до 12 000 000 ₽",
                term: "до 30 лет",
                currency: "₽",
                risk: "—",
                toast: {
                    rate: { title: "Ставка одобрена", text: "Предодобренная ставка для вас — 6,0% годовых.", variant: "success" },
                    promo: { title: "Скидка", text: "При оформлении ДСЖ ставка снижается ещё на 1%.", variant: "warning" },
                    info: { title: "Документы", text: "Нужен паспорт, справка 2-НДФЛ и свидетельства о рождении детей.", variant: "info" }
                }
            },
            {
                id: 3,
                type: "Инвестиции",
                src: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800",
                title: "ИИС Тип Б",
                shortText: "Индивидуальный инвестиционный счёт с налоговым вычетом.",
                text: "Брокерский счёт с особым налоговым режимом. Освобождение от НДФЛ с дохода от операций при сроке владения от 3 лет.",
                rate: "до 22%",
                minAmount: "от 1 000 ₽",
                term: "от 3 лет",
                currency: "₽",
                risk: "Средний",
                toast: {
                    rate: { title: "Доходность портфеля", text: "Средняя доходность клиентов за 12 мес: +18,3%.", variant: "success" },
                    promo: { title: "Бонус", text: "Первые 3 месяца — брокерская комиссия 0%.", variant: "warning" },
                    info: { title: "Налоговый вычет", text: "Вычет до 52 000 ₽ в год при пополнении до 400 000 ₽.", variant: "info" }
                }
            },
            {
                id: 4,
                type: "Карта",
                src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800",
                title: "Карта «Кэшбэк+»",
                shortText: "Дебетовая карта с повышенным кэшбэком в избранных категориях.",
                text: "Дебетовая карта с бесплатным обслуживанием при сумме покупок от 10 000 ₽ в месяц. Кэшбэк до 10% в трёх выбираемых категориях.",
                rate: "до 10% кэшбэк",
                minAmount: "Бесплатно",
                term: "Бессрочно",
                currency: "₽ / $ / €",
                risk: "—",
                toast: {
                    rate: { title: "Кэшбэк зачислен", text: "На счёт зачислено 1 247 ₽ за прошлый месяц.", variant: "success" },
                    promo: { title: "Партнёрская акция", text: "10% кэшбэк в Яндекс.Еде до конца месяца.", variant: "warning" },
                    info: { title: "Категории", text: "Выбор категорий обновляется каждый квартал в приложении.", variant: "info" }
                }
            },
            {
                id: 5,
                type: "Кредит",
                src: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800",
                title: "Потребительский кредит",
                shortText: "Кредит наличными без залога и поручителей.",
                text: "Кредит на любые цели с возможностью онлайн-оформления. Решение за 2 минуты, деньги на карту в течение часа.",
                rate: "от 12,9%",
                minAmount: "до 5 000 000 ₽",
                term: "до 7 лет",
                currency: "₽",
                risk: "—",
                toast: {
                    rate: { title: "Предодобрено", text: "Вам предодобрен кредит 2 500 000 ₽ под 12,9%.", variant: "success" },
                    promo: { title: "Страховка", text: "При подключении страховки ставка снижается на 3%.", variant: "warning" },
                    info: { title: "Досрочное погашение", text: "Без ограничений и комиссий в любой момент.", variant: "info" }
                }
            },
            {
                id: 6,
                type: "Вклад",
                src: "https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?w=800",
                title: "Валютный вклад «Доллар»",
                shortText: "Срочный вклад в долларах США с выплатой процентов в конце срока.",
                text: "Депозит в иностранной валюте для диверсификации сбережений. Ставка фиксируется на весь срок, выплата процентов — в конце срока.",
                rate: "3,5%",
                minAmount: "100 $",
                term: "6, 12, 24 мес",
                currency: "$",
                risk: "Низкий",
                toast: {
                    rate: { title: "Курс на сегодня", text: "Покупка: 92,14 ₽ / Продажа: 94,65 ₽.", variant: "success" },
                    promo: { title: "Акция", text: "При открытии от $5 000 — +0,3% к ставке.", variant: "warning" },
                    info: { title: "Внимание", text: "Досрочное закрытие — по ставке вклада «До востребования».", variant: "info" }
                }
            }
        ];
    }

    clickCard(e) {
        const cardId = Number(e.target.dataset.id);
        const productPage = new ProductPage(this.parent, cardId, this.getData());
        productPage.render();
    }

    render() {
        this.parent.innerHTML = "";
        const html = this.getHTML();
        this.parent.insertAdjacentHTML("beforeend", html);

        const data = this.getData();
        const cardsRow = document.getElementById("cards-row");
        data.forEach((item) => {
            const productCard = new ProductCardComponent(cardsRow);
            productCard.render(item, this.clickCard.bind(this));
        });
    }
}
