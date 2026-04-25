import { CarouselComponent } from "../../components/carousel/index.js";
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
                <p class="text-muted mb-4">Выберите подходящий вклад и откройте его онлайн за несколько минут. Нажмите на карточку, чтобы посмотреть подробные условия.</p>
                <div id="carousel-root"></div>
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
                shortText: "Классический срочный вклад с ежемесячной капитализацией.",
                text: "Надёжный депозит с фиксированной ставкой на весь срок. Начисленные проценты ежемесячно прибавляются к сумме вклада и увеличивают доходность.",
                rate: "14,5%",
                minAmount: "10 000 ₽",
                term: "от 3 до 36 месяцев",
                currency: "₽",
                risk: "Низкий",
                toast: {
                    rate: { title: "Ставка обновлена", text: "Текущая ставка по вкладу «Накопительный» — 14,5% годовых.", variant: "success" },
                    promo: { title: "Акция", text: "При открытии онлайн +0,5% к ставке. Действует до 30 апреля.", variant: "warning" },
                    info: { title: "Условия вклада", text: "Пополнение без ограничений, частичное снятие — до 50% остатка.", variant: "info" }
                }
            },
            {
                id: 2,
                type: "Вклад",
                src: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=800",
                title: "Вклад «Максимум»",
                shortText: "Максимальная ставка без права досрочного снятия.",
                text: "Вклад для тех, кто готов зафиксировать сумму на весь срок ради наилучшей ставки. Проценты выплачиваются в конце срока.",
                rate: "18,5%",
                minAmount: "50 000 ₽",
                term: "12 месяцев",
                currency: "₽",
                risk: "Низкий",
                toast: {
                    rate: { title: "Лучшая ставка", text: "Вклад «Максимум» — 18,5% годовых при сроке 12 мес.", variant: "success" },
                    promo: { title: "Акция", text: "При сумме от 300 000 ₽ надбавка +0,3%.", variant: "warning" },
                    info: { title: "Важно", text: "Досрочное расторжение не предусмотрено.", variant: "info" }
                }
            },
            {
                id: 3,
                type: "Вклад",
                src: "https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?w=800",
                title: "Вклад «Пополняемый»",
                shortText: "Пополняемый депозит с гибким управлением средствами.",
                text: "Удобный вклад с возможностью пополнения в любое время без ограничений. Ставка фиксируется на дату открытия.",
                rate: "13,0%",
                minAmount: "5 000 ₽",
                term: "от 6 до 24 месяцев",
                currency: "₽",
                risk: "Низкий",
                toast: {
                    rate: { title: "Ставка", text: "«Пополняемый» — 13,0% при сроке от 6 месяцев.", variant: "success" },
                    promo: { title: "Бонус", text: "При первом пополнении свыше 100 000 ₽ — подарочная карта.", variant: "warning" },
                    info: { title: "Пополнение", text: "Минимальная сумма пополнения — 1 000 ₽.", variant: "info" }
                }
            },
            {
                id: 4,
                type: "Вклад",
                src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
                title: "Вклад «Онлайн»",
                shortText: "Повышенная ставка за открытие через мобильное приложение.",
                text: "Эксклюзивный вклад, доступный только в мобильном приложении. Надбавка к базовой ставке за цифровое оформление без визита в офис.",
                rate: "19,5%",
                minAmount: "1 000 ₽",
                term: "3, 6, 12 месяцев",
                currency: "₽",
                risk: "Низкий",
                toast: {
                    rate: { title: "Цифровая ставка", text: "«Онлайн» — 19,5% только в приложении ФинансБанк.", variant: "success" },
                    promo: { title: "Кэшбэк", text: "Кэшбэк 500 ₽ при открытии от 30 000 ₽.", variant: "warning" },
                    info: { title: "Условия", text: "Открытие — только через приложение. Пролонгация автоматическая.", variant: "info" }
                }
            },
            {
                id: 5,
                type: "Вклад",
                src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800",
                title: "Вклад «Пенсионный»",
                shortText: "Специальный вклад для граждан пенсионного возраста.",
                text: "Повышенная ставка для пенсионеров с ежемесячной выплатой процентов на карту. Возможность частичного снятия без потери начисленных процентов.",
                rate: "17,0%",
                minAmount: "3 000 ₽",
                term: "от 6 до 36 месяцев",
                currency: "₽",
                risk: "Низкий",
                toast: {
                    rate: { title: "Социальная ставка", text: "«Пенсионный» — 17,0% для держателей пенсионной карты.", variant: "success" },
                    promo: { title: "Льгота", text: "Бесплатное страхование вклада сверх суммы АСВ.", variant: "warning" },
                    info: { title: "Выплата", text: "Проценты зачисляются на пенсионную карту ежемесячно.", variant: "info" }
                }
            },
            {
                id: 6,
                type: "Вклад",
                src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800",
                title: "Вклад «Детский»",
                shortText: "Копилка для детей с начислением процентов каждый квартал.",
                text: "Вклад на имя ребёнка с квартальной капитализацией. Деньги можно снять по достижении совершеннолетия или раньше — с согласия органов опеки.",
                rate: "15,0%",
                minAmount: "1 000 ₽",
                term: "до 18 лет",
                currency: "₽",
                risk: "Низкий",
                toast: {
                    rate: { title: "Ставка детского", text: "«Детский» — 15,0% с ежеквартальной капитализацией.", variant: "success" },
                    promo: { title: "Подарок", text: "При открытии — набор монет-сувениров для ребёнка.", variant: "warning" },
                    info: { title: "Условия", text: "Открывается родителем или опекуном. Документ ребёнка обязателен.", variant: "info" }
                }
            },
            {
                id: 7,
                type: "Вклад",
                src: "https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?w=800",
                title: "Вклад «Доллар»",
                shortText: "Срочный вклад в долларах США с фиксированной ставкой.",
                text: "Депозит в иностранной валюте для диверсификации сбережений. Ставка фиксируется на весь срок, выплата процентов — в конце срока.",
                rate: "3,5%",
                minAmount: "100 $",
                term: "6, 12, 24 мес",
                currency: "$",
                risk: "Низкий",
                toast: {
                    rate: { title: "Валютная ставка", text: "«Доллар» — 3,5% годовых в USD.", variant: "success" },
                    promo: { title: "Акция", text: "При открытии от $5 000 — надбавка +0,3%.", variant: "warning" },
                    info: { title: "Внимание", text: "Досрочное закрытие — по ставке «До востребования» 0,01%.", variant: "info" }
                }
            },
            {
                id: 8,
                type: "Вклад",
                src: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800",
                title: "Вклад «Евро»",
                shortText: "Надёжный депозит в евро с ежегодной выплатой процентов.",
                text: "Сохраните сбережения в европейской валюте. Проценты выплачиваются раз в год, возможна пролонгация на тех же условиях.",
                rate: "2,8%",
                minAmount: "100 €",
                term: "12, 24 мес",
                currency: "€",
                risk: "Низкий",
                toast: {
                    rate: { title: "Ставка EUR", text: "«Евро» — 2,8% годовых в EUR.", variant: "success" },
                    promo: { title: "Акция", text: "При конвертации из рублей — льготный курс +0,5%.", variant: "warning" },
                    info: { title: "Выплата", text: "Проценты выплачиваются в конце каждого года.", variant: "info" }
                }
            },
            {
                id: 9,
                type: "Вклад",
                src: "https://images.unsplash.com/photo-1559526324-593bc073d938?w=800",
                title: "Вклад «Премиум»",
                shortText: "Для премиальных клиентов — эксклюзивная ставка от 20 млн ₽.",
                text: "Индивидуальные условия для крупных вкладчиков. Персональный менеджер, повышенная страховая защита и приоритетное обслуживание.",
                rate: "21,0%",
                minAmount: "20 000 000 ₽",
                term: "6 или 12 месяцев",
                currency: "₽",
                risk: "Низкий",
                toast: {
                    rate: { title: "Премиальная ставка", text: "«Премиум» — 21,0% для вкладов от 20 млн ₽.", variant: "success" },
                    promo: { title: "Сервис", text: "Бесплатное юридическое сопровождение в течение срока вклада.", variant: "warning" },
                    info: { title: "Менеджер", text: "Персональный менеджер доступен 24/7 по выделенной линии.", variant: "info" }
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

        const carouselRoot = document.getElementById("carousel-root");
        const carousel = new CarouselComponent(carouselRoot);
        carousel.render(data.slice(0, 5), this.clickCard.bind(this));

        const cardsRow = document.getElementById("cards-row");
        data.forEach((item) => {
            const productCard = new ProductCardComponent(cardsRow);
            productCard.render(item, this.clickCard.bind(this));
        });
    }
}
