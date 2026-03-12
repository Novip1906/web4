document.addEventListener('DOMContentLoaded', () => {
    // --- Tab Switching Logic ---
    const navLinks = document.querySelectorAll('.nav-link');
    const tabContents = document.querySelectorAll('.tab-content');
    const navLogo = document.getElementById('nav-logo');

    function switchTab(tabId) {
        // Update nav links
        navLinks.forEach(link => {
            if (link.dataset.tab === tabId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Update tab content
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

    // --- Theme Switching Logic ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Check for saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-theme');
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-theme');
        const currentTheme = body.classList.contains('light-theme') ? 'light' : 'dark';
        localStorage.setItem('theme', currentTheme);
    });

    // --- Calculator Logic ---
    let displayValue = '0';
    let firstOperand = null;
    let waitingForSecondOperand = false;
    let operator = null;

    const display = document.getElementById('result');

    function updateDisplay() {
        display.innerText = displayValue;
    }

    function inputDigit(digit) {
        if (waitingForSecondOperand) {
            displayValue = digit;
            waitingForSecondOperand = false;
        } else {
            displayValue = displayValue === '0' ? digit : displayValue + digit;
        }
    }

    function inputDecimal(dot) {
        if (waitingForSecondOperand) {
            displayValue = '0.';
            waitingForSecondOperand = false;
            return;
        }
        if (!displayValue.includes(dot)) {
            displayValue += dot;
        }
    }

    function handleOperator(nextOperator) {
        const inputValue = parseFloat(displayValue);

        if (operator && waitingForSecondOperand) {
            operator = nextOperator;
            return;
        }

        if (firstOperand === null) {
            firstOperand = inputValue;
        } else if (operator) {
            const result = performCalculation[operator](firstOperand, inputValue);
            displayValue = `${parseFloat(result.toFixed(7))}`;
            firstOperand = result;
        }

        waitingForSecondOperand = true;
        operator = nextOperator;
    }

    const performCalculation = {
        '/': (prev, next) => prev / next,
        '*': (prev, next) => prev * next,
        '+': (prev, next) => prev + next,
        '-': (prev, next) => prev - next,
        '=': (prev, next) => next
    };

    function resetCalculator() {
        displayValue = '0';
        firstOperand = null;
        waitingForSecondOperand = false;
        operator = null;
    }

    function toggleSign() {
        displayValue = (parseFloat(displayValue) * -1).toString();
    }

    function inputPercent() {
        displayValue = (parseFloat(displayValue) / 100).toString();
    }

    const keypad = document.querySelector('.keypad');
    if (keypad) {
        keypad.addEventListener('click', (event) => {
            const { target } = event;
            if (!target.matches('button')) return;

            if (target.id === 'btn_op_clear') {
                resetCalculator();
                updateDisplay();
                return;
            }

            if (target.id === 'btn_op_sign') {
                toggleSign();
                updateDisplay();
                return;
            }

            if (target.id === 'btn_op_percent') {
                inputPercent();
                updateDisplay();
                return;
            }

            if (target.classList.contains('primary') && target.id !== 'btn_op_equal') {
                const opMap = {
                    'btn_op_div': '/',
                    'btn_op_mult': '*',
                    'btn_op_minus': '-',
                    'btn_op_plus': '+'
                };
                handleOperator(opMap[target.id]);
                updateDisplay();
                return;
            }

            if (target.id === 'btn_op_equal') {
                handleOperator('=');
                updateDisplay();
                operator = null; // Reset operator after equals
                firstOperand = null;
                waitingForSecondOperand = false;
                return;
            }

            if (target.id === 'btn_digit_dot') {
                inputDecimal('.');
                updateDisplay();
                return;
            }

            // Digit buttons
            const digit = target.innerText;
            inputDigit(digit);
            updateDisplay();
        });
    }
});
