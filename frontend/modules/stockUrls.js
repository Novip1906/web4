export class StockUrls {
    constructor(baseUrl = "http://localhost:3000") {
        this.baseUrl = baseUrl;
        this.resource = "/products";
    }

    getStocks(params = {}) {
        const query = new URLSearchParams(params).toString();
        const tail = query ? `?${query}` : "";
        return `${this.baseUrl}${this.resource}${tail}`;
    }

    getStockById(id) {
        return `${this.baseUrl}${this.resource}/${id}`;
    }

    createStock() {
        return `${this.baseUrl}${this.resource}`;
    }

    updateStockById(id) {
        return `${this.baseUrl}${this.resource}/${id}`;
    }

    removeStockById(id) {
        return `${this.baseUrl}${this.resource}/${id}`;
    }
}

export const stockUrls = new StockUrls();
