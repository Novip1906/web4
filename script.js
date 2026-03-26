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

    let expression = ''; 
    let currentOperand = ''; 
    let finish = false;

    const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '000'];
    const action = ['-', '+', 'x', '/'];

    const out = document.getElementById('result');
    const historyOut = document.getElementById('history');

    function updateDisplay(main, history) {
        out.textContent = main || '0';
        if (history !== undefined) {
            historyOut.textContent = history;
        }
    }

    function getFullDisplayString() {
        return expression + currentOperand || '0';
    }

    function clearAll() {
        expression = '';
        currentOperand = '';
        finish = false;
        updateDisplay('0', '');
    }

    function factorial(n) {
        if (n < 0) return 'Ошибка';
        if (n === 0 || n === 1) return 1;
        let res = 1;
        for (let i = 2; i <= n; i++) res *= i;
        return res;
    }

    const MAX_LENGTH = 15; 

    function formatOutput(num) {
        if (typeof num !== 'number') return num;
        let str = num.toString();
        if (str.length > 10) {
            if (Math.abs(num) >= 1e10 || (Math.abs(num) < 1e-7 && num !== 0)) {
                return num.toExponential(4);
            }
            return parseFloat(num.toFixed(4));
        }
        return num;
    }

    function evaluateExpression(str) {
        try {
            let safeStr = str.replace(/x/g, '*');
            
            if (safeStr.includes('/0')) return 'Ошибка';

            let result = new Function('return ' + safeStr)();
            
            if (isNaN(result) || !isFinite(result)) return 'Ошибка';
            return result;
        } catch (e) {
            return 'Ошибка';
        }
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
                if (currentOperand !== '') {
                    currentOperand = currentOperand.slice(0, -1);
                } else if (expression !== '') {
                    expression = expression.trim().slice(0, -1).trim();
                }
                updateDisplay(getFullDisplayString());
                return;
            }

            if (digit.includes(key)) {
                if (finish) {
                    if (key !== '.') {
                        expression = '';
                        currentOperand = '';
                    }
                    finish = false;
                }

                if (key === '.' && currentOperand.includes('.')) return;
                
                if (key === '000') {
                    if (currentOperand === '' || currentOperand === '0') {
                        currentOperand = '0';
                    } else {
                        currentOperand += '000';
                    }
                } else if (key === '.') {
                    if (currentOperand === '') currentOperand = '0';
                    currentOperand += '.';
                } else {
                    if (currentOperand === '0') {
                        currentOperand = key;
                    } else {
                        currentOperand += key;
                    }
                }

                if (currentOperand.length > MAX_LENGTH) {
                    currentOperand = currentOperand.slice(0, MAX_LENGTH);
                }

                updateDisplay(getFullDisplayString());
                return;
            }

            if (action.includes(key)) {
                if (finish) {
                    expression = out.textContent + key;
                    currentOperand = '';
                    finish = false;
                } else {
                    if (currentOperand === '' && expression !== '') {
                        expression = expression.slice(0, -1) + key;
                    } else {
                        expression += currentOperand + key;
                        currentOperand = '';
                    }
                }
                updateDisplay(getFullDisplayString());
                return;
            }

            if (key === '=') {
                if (expression === '' && currentOperand === '') return;
                
                let fullExpr = expression + currentOperand;
                let result = evaluateExpression(fullExpr);
                
                updateDisplay(formatOutput(result), fullExpr);
                
                expression = '';
                currentOperand = formatOutput(result).toString();
                finish = true;
                return;
            }

            if (id === 'btn_op_sign') {
                if (currentOperand !== '') {
                    currentOperand = (Number(currentOperand) * -1).toString();
                } else if (finish) {
                    currentOperand = (Number(out.textContent) * -1).toString();
                    finish = false;
                }
                updateDisplay(getFullDisplayString());
            }


            if (id === 'btn_op_sqrt' || id === 'btn_op_sqr' || id === 'btn_op_fact' || id === 'btn_op_percent') {
                if (expression !== '' || currentOperand !== '') {
                    let fullExpr = expression + currentOperand;
                    let val = evaluateExpression(fullExpr);
                    
                    if (val === 'Ошибка') {
                        currentOperand = 'Ошибка';
                    } else {
                        let res;
                        if (id === 'btn_op_sqrt') res = Math.sqrt(val);
                        else if (id === 'btn_op_sqr') res = val * val;
                        else if (id === 'btn_op_fact') res = factorial(val);
                        else if (id === 'btn_op_percent') res = val / 100;
                        
                        currentOperand = formatOutput(res).toString();
                    }
                    
                    let displayHistory = fullExpr;
                    if (id === 'btn_op_sqrt') displayHistory = `sqrt(${fullExpr})`;
                    else if (id === 'btn_op_sqr') displayHistory = `(${fullExpr})²`;
                    else if (id === 'btn_op_fact') displayHistory = `(${fullExpr})!`;
                    else if (id === 'btn_op_percent') displayHistory = `(${fullExpr})%`;

                    expression = '';
                    finish = true;
                    updateDisplay(currentOperand, displayHistory);
                }
            }
        };
    }
});

