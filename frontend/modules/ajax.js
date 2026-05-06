export class Ajax {
    _handleResponse(xhr, callback) {
        if (xhr.readyState !== 4) return;

        let data = null;
        if (xhr.responseText) {
            try {
                data = JSON.parse(xhr.responseText);
            } catch (e) {
                data = null;
            }
        }
        const ok = xhr.status >= 200 && xhr.status < 300;
        callback(ok ? data : null, ok ? null : { status: xhr.status, data });
    }

    get(url, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.setRequestHeader("Accept", "application/json");
        xhr.onreadystatechange = () => this._handleResponse(xhr, callback);
        xhr.send();
    }

    post(url, data, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = () => this._handleResponse(xhr, callback);
        xhr.send(JSON.stringify(data));
    }

    patch(url, data, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open("PATCH", url, true);
        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = () => this._handleResponse(xhr, callback);
        xhr.send(JSON.stringify(data));
    }

    delete(url, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open("DELETE", url, true);
        xhr.setRequestHeader("Accept", "application/json");
        xhr.onreadystatechange = () => this._handleResponse(xhr, callback);
        xhr.send();
    }
}

export const ajax = new Ajax();
