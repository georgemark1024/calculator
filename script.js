function add(...args) {
    let sum = 0;

    args.forEach(num => {
        sum+= num;
    });

    return sum;
}

function subtract(...args) {
    let diff = args[0];

    args.forEach(num => {
        diff-= num;
    });

    return diff;
}

function multiply(...args) {
    let res = 1;

    args.forEach(num => {
        res*= num;
    });

    return res;
}

function divide(...args) {
    let res = args[0];

    args.forEach(num => {
        res/= num;
    });

    return res;
}

function operate(num1, operator, num2) {
    switch (operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "*":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);
        default:
            break;
    }
}

clear = document.querySelector("#clear");
equal = document.querySelector("#equal");
display = document.querySelector(".display");
btns = document.querySelectorAll(".calc-button");

clear.addEventListener("click", () => {
    display.textContent = "";
});

for (let i = 0; i < btns.length; i++) {
    if (btns[i].id == "clear" || btns[i].id == "equal") {
        continue;
    }
    btns[i].addEventListener("click", () => {
        display.textContent += btns[i].textContent;
    })
}

function evaluate(expr) {
    let operators = ["*", "/", "+", "-"];

    let i = 0;
    while (expr.length != 1) {
        if (operators.includes(expr[i])) {
            let num1 = Number(expr[i - 1]);
            let operator = expr[i];
            let num2 = Number(expr[i + 1]);
            let res = operate(num1, operator, num2);
            expr.splice(i - 1, 3, res);
            i = 0;
        }
        i++;
    }

    return expr[0];
}

equal.addEventListener("click", () => {
    if (display.textContent == "")
        return;

    expr = display.textContent.split(/([+\-*/])/);
    res = evaluate(expr);

    display.textContent = res;
});

