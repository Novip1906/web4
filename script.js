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
    const action = ['-', '+', 'x', '/', 'log'];

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
            case "log":
                a = Math.log10(numA);
                break;
        }
        finish = true;
        out.textContent = isNaN(a) ? 'Ошибка' : parseFloat(Number(a).toFixed(7));
        b = '';
    }

    document.getElementById('btn_op_clear').onclick = clearAll;
    document.getElementById('btn_op_clear_all').onclick = clearAll;

    document.getElementById('btn_op_bg_color').onclick = () => {
        const colors = ['#121212', '#1a1a2e', '#2d3436', '#000000', '#2c3e50'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        document.body.style.backgroundColor = randomColor;
    };

    document.getElementById('btn_op_res_color').onclick = () => {
        const colors = ['#2d2d2d', '#34495e', '#1e272e', '#485460'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        out.style.backgroundColor = randomColor;
    };

    const calculator = document.querySelector('.calculator');
    if (calculator) {
        calculator.onclick = (event) => {
            if (!event.target.classList.contains('my-btn')) return;
            const key = event.target.textContent;
            const id = event.target.id;

            if (id === 'btn_op_clear' || id === 'btn_op_clear_all' || id === 'btn_op_bg_color' || id === 'btn_op_res_color') return;

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
                let val = key === '000' ? '000' : key;
                if (b === '' && sign === '') {
                    a += val;
                    out.textContent = a;
                } else if (a !== '' && b !== '' && finish) {
                    b = val;
                    finish = false;
                    out.textContent = b;
                } else {
                    b += val;
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
                    out.textContent = a;
                } else {
                    b = -b;
                    out.textContent = b;
                }
            }

            if (id === 'btn_op_percent') {
                if (b === '') {
                    a = a / 100;
                    out.textContent = a;
                } else {
                    b = (a * b) / 100;
                    out.textContent = b;
                }
            }

            if (id === 'btn_op_sqrt') {
                let val = b === '' ? a : b;
                let res = Math.sqrt(Number(val));
                if (b === '') a = res; else b = res;
                out.textContent = parseFloat(Number(res).toFixed(7));
            }

            if (id === 'btn_op_sqr') {
                let val = b === '' ? a : b;
                let res = Number(val) * Number(val);
                if (b === '') a = res; else b = res;
                out.textContent = parseFloat(Number(res).toFixed(7));
            }

            if (id === 'btn_op_fact') {
                let val = b === '' ? a : b;
                let res = factorial(Number(val));
                if (b === '') a = res; else b = res;
                out.textContent = res;
            }
        };
    }
});
