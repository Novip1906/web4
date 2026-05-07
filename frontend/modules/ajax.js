export class Ajax {
    async _request(url, options = {}) {
        const response = await fetch(url, {
            headers: {
                Accept: "application/json",
                ...(options.body ? { "Content-Type": "application/json" } : {}),
                ...(options.headers || {}),
            },
            ...options,
        });

        let data = null;
        const text = await response.text();
        if (text) {
            try {
                data = JSON.parse(text);
            } catch {
                data = null;
            }
        }

        if (!response.ok) {
            const error = new Error(`HTTP ${response.status}`);
            error.status = response.status;
            error.data = data;
            throw error;
        }
        return data;
    }

    get(url) {
        return this._request(url, { method: "GET" });
    }

    post(url, data) {
        return this._request(url, {
            method: "POST",
            body: JSON.stringify(data),
        });
    }

    patch(url, data) {
        return this._request(url, {
            method: "PATCH",
            body: JSON.stringify(data),
        });
    }

    delete(url) {
        return this._request(url, { method: "DELETE" });
    }
}

export const ajax = new Ajax();
