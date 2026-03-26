# ЛР 2. Calculator. JavaScript

**Цель** данной лабораторной работы - знакомство с инструментами построения пользовательских интерфейсов web-сайтов: HTML, CSS, JavaScript. В ходе выполнения работы, вам предстоит продолжить реализовывать простой калькулятор, и затем выполнить задания по варианту.

* [Методические указания](https://github.com/iu5git/JavaScript/blob/main/tutorials/lab2/README.md)

## Дополнительное задание (История вычислений)

Преподавателем было дано дополнительное задание: реализовать полноценную историю вычислений, которая корректно отображает не только обычные операции, но и унарные (корень, квадрат, факториал, процент), применяемые ко всему текущему выражению.

### Реализация

Для отображения истории используется функция обновления дисплея `updateDisplay`, которая принимает основной результат и строку истории:

```javascript
function updateDisplay(main, history) {
    out.textContent = main || '0';
    if (history !== undefined) {
        historyOut.textContent = history;
    }
}
```

При нажатии на кнопки унарных операций (√, x², n!, %), вычисляется текущее выражение, и в историю передается отформатированная строка:

```javascript
if (id === 'btn_op_sqrt' || id === 'btn_op_sqr' || id === 'btn_op_fact' || id === 'btn_op_percent') {
    if (expression !== '' || currentOperand !== '') {
        let fullExpr = expression + currentOperand;
        let val = evaluateExpression(fullExpr);
        
        let res;
        let displayHistory = fullExpr;
        if (id === 'btn_op_sqrt') {
            res = Math.sqrt(val);
            displayHistory = `sqrt(${fullExpr})`;
        } else if (id === 'btn_op_sqr') {
            res = val * val;
            displayHistory = `(${fullExpr})²`;
        }
        // ... аналогично для n! и %

        currentOperand = formatOutput(res).toString();
        expression = '';
        finish = true;
        updateDisplay(currentOperand, displayHistory);
    }
}
```