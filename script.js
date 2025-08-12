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
            add(num1, num2);
            break;
        case "-":
            subtract(num1, num2);
            break;
        case "*":
            multiply(num1, num2);
            break;
        case "/":
            divide(num1, num2);
            break;
        default:
            break;
    }
}

clear = document.querySelector("#clear");
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
