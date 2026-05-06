export class ToastComponent {
    constructor(parent) {
        this.parent = parent;
        this.counter = 0;
    }

    getHeaderClass(variant) {
        switch (variant) {
            case "success": return "bg-success text-white";
            case "warning": return "bg-warning text-dark";
            case "danger":  return "bg-danger text-white";
            case "info":
            default:        return "bg-info text-white";
        }
    }

    getIcon(variant) {
        switch (variant) {
            case "success": return "✓";
            case "warning": return "★";
            case "danger":  return "!";
            case "info":
            default:        return "ℹ";
        }
    }

    show({ title, text, variant = "info" }) {
        const id = `toast-${Date.now()}-${this.counter++}`;
        const headerClass = this.getHeaderClass(variant);
        const icon = this.getIcon(variant);
        const html = `
            <div id="${id}" class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="4000">
                <div class="toast-header ${headerClass}">
                    <strong class="me-auto">${icon} ${title}</strong>
                    <small>только что</small>
                    <button type="button" class="btn-close btn-close-white ms-2" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">
                    ${text}
                </div>
            </div>
        `;
        this.parent.insertAdjacentHTML("beforeend", html);

        const toastEl = document.getElementById(id);
        const bsToast = new bootstrap.Toast(toastEl);
        toastEl.addEventListener("hidden.bs.toast", () => toastEl.remove());
        bsToast.show();
    }
}
