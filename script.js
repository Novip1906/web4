document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const tabContents = document.querySelectorAll('.tab-content');
    const navLogo = document.getElementById('nav-logo');

    function switchTab(tabId) {
        navLinks.forEach(link => {
            if (link.dataset.tab === tabId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        tabContents.forEach(content => {
            if (content.id === `tab-${tabId}`) {
                content.classList.add('active');
            } else {
                content.classList.remove('active');
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            switchTab(link.dataset.tab);
        });
    });

    if (navLogo) {
        navLogo.addEventListener('click', () => {
            switchTab('home');
        });
    }

    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-theme');
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-theme');
        const currentTheme = body.classList.contains('light-theme') ? 'light' : 'dark';
        localStorage.setItem('theme', currentTheme);
    });

    let a = '';
    let b = '';
    let sign = '';
    let finish = false;

    const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '000'];
    const action = ['-', '+', 'x', '/'];

    const out = document.getElementById('result');

    function clearAll() {
        a = '';
        b = '';
        sign = '';
        finish = false;
        out.textContent = 0;
    }

    function factorial(n) {
        if (n < 0) return 'Ошибка';
        if (n === 0 || n === 1) return 1;
        let res = 1;
        for (let i = 2; i <= n; i++) res *= i;
        return res;
    }

    const MAX_LENGTH = 10;

    function formatOutput(num) {
        let str = num.toString();
        if (str.length > MAX_LENGTH) {
            if (Math.abs(num) >= 1e10 || (Math.abs(num) < 1e-7 && num !== 0)) {
                return num.toExponential(4);
            }
            return parseFloat(num.toFixed(MAX_LENGTH - str.split('.')[0].length - 1));
        }
        return num;
    }

    function performCalculation() {
        if (b === '') b = a;
        let numA = Number(a);
        let numB = Number(b);

        switch (sign) {
            case "+":
                a = numA + numB;
                break;
            case "-":
                a = numA - numB;
                break;
            case "x":
                a = numA * numB;
                break;
            case "/":
                if (numB === 0) {
                    out.textContent = 'Ошибка';
                    a = ''; b = ''; sign = '';
                    return;
                }
                a = numA / numB;
                break;
        }
        finish = true;
        out.textContent = isNaN(a) ? 'Ошибка' : formatOutput(Number(a));
        b = '';
    }

    document.getElementById('btn_op_clear').onclick = clearAll;

    const calculator = document.querySelector('.calculator');
    if (calculator) {
        calculator.onclick = (event) => {
            if (!event.target.classList.contains('my-btn')) return;
            const key = event.target.textContent;
            const id = event.target.id;

            if (id === 'btn_op_clear') return;

            if (id === 'btn_op_backspace') {
                if (b !== '') {
                    b = b.toString().slice(0, -1);
                    out.textContent = b || 0;
                } else {
                    a = a.toString().slice(0, -1);
                    out.textContent = a || 0;
                }
                return;
            }

            if (digit.includes(key)) {
                if (b === '' && sign === '') {
                    if (finish) {
                        a = '';
                        finish = false;
                    }
                    if (a === '0' && key !== '.') {
                        a = key === '000' ? '0' : key;
                    } else {
                        let val = (a === '' && key === '000') ? '0' : key;
                        if (a.length + val.length > MAX_LENGTH) return;
                        a += val;
                    }
                    out.textContent = a;
                } else {
                    if (finish) {
                        b = '';
                        finish = false;
                    }
                    if (b === '0' && key !== '.') {
                        b = key === '000' ? '0' : key;
                    } else {
                        let val = (b === '' && key === '000') ? '0' : key;
                        if (b.length + val.length > MAX_LENGTH) return;
                        b += val;
                    }
                    out.textContent = b;
                }
                return;
            }

            if (action.includes(key)) {
                if (a !== '' && b !== '') {
                    performCalculation();
                }
                sign = key;
                out.textContent = sign;
                return;
            }

            if (key === '=') {
                performCalculation();
            }

            if (id === 'btn_op_sign') {
                if (b === '') {
                    a = -a;
                    out.textContent = formatOutput(Number(a));
                } else {
                    b = -b;
                    out.textContent = formatOutput(Number(b));
                }
            }

            if (id === 'btn_op_percent') {
                if (b === '') {
                    a = a / 100;
                    out.textContent = formatOutput(Number(a));
                } else {
                    b = (a * b) / 100;
                    out.textContent = formatOutput(Number(b));
                }
            }

            if (id === 'btn_op_sqrt') {
                let val = b === '' ? a : b;
                let res = Math.sqrt(Number(val));
                if (b === '') a = res; else b = res;
                out.textContent = formatOutput(Number(res));
            }

            if (id === 'btn_op_sqr') {
                let val = b === '' ? a : b;
                let res = Number(val) * Number(val);
                if (b === '') a = res; else b = res;
                out.textContent = formatOutput(Number(res));
            }

            if (id === 'btn_op_fact') {
                let val = b === '' ? a : b;
                let res = factorial(Number(val));
                if (b === '') a = res; else b = res;
                out.textContent = formatOutput(Number(res));
            }
        };
    }
});

