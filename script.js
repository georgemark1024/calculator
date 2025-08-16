function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
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
    let operators = ["/", "*", "+", "-"];

    let operatorsObj = expr.reduce((obj, item, index) => {
        if (operators.includes(item)) {
            if (item in obj)
                obj[item].push(index);
            else
                obj[item] = [index];
        }
        return obj;
    }, {});


    while (Object.keys(operatorsObj).length != 0) {
        const [mul, div, addSign, sub] = ["*", "/", "+", "-"];

        if (div in operatorsObj) {
            locations = operatorsObj[div];

            let i = 0;
            while (locations.length) {
                opLocation = locations[i];
                indexNum1 = opLocation - 1;
                indexNum2 = opLocation + 1;
                res = operate(Number(expr[indexNum1]), div, Number(expr[indexNum2]));
                expr.splice(indexNum1, 3, res);
                locations.splice(i, 1);

            }

            if (locations.length == 0)
                delete operatorsObj[div];

        } else if (mul in operatorsObj) {
            locations = operatorsObj[mul];

            let i = 0;
            while (locations.length) {
                opLocation = locations[i];
                indexNum1 = opLocation - 1;
                indexNum2 = opLocation + 1;
                res = operate(Number(expr[indexNum1]), mul, Number(expr[indexNum2]));
                expr.splice(indexNum1, 3, res);
                locations.splice(i, 1);
            }
            
            if (locations.length == 0)
                delete operatorsObj[mul];


        } else if (addSign in operatorsObj) {
            locations = operatorsObj[addSign];

            let i = 0;
            while (locations.length) {
                opLocation = locations[i];
                indexNum1 = opLocation - 1;
                indexNum2 = opLocation + 1;
                res = operate(Number(expr[indexNum1]), addSign, Number(expr[indexNum2]));
                expr.splice(indexNum1, 3, res);
                locations.splice(i, 1);

            }
            
            if (locations.length == 0)
                delete operatorsObj[addSign];


        } else if (sub in operatorsObj) {
            locations = operatorsObj[sub];

            let i = 0;
            while (locations.length) {
                opLocation = locations[i];
                indexNum1 = opLocation - 1;
                indexNum2 = opLocation + 1;
                res = operate(Number(expr[indexNum1]), sub, Number(expr[indexNum2]));
                expr.splice(indexNum1, 3, res);
                locations.splice(i, 1);

            }
            
            if (locations.length == 0)
                delete operatorsObj[sub];

        }
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

