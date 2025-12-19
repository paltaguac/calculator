function sum(num1, num2) {
  return num1 + num2;
}
function minus(num1, num2) {
  return num1 - num2;
}
function multiply(num1, num2) {
  return num1 * num2;
}
function division(num1, num2) {
    if (num2 === 0){
        return "Bad boy!"
    }
  return num1 / num2;
}
function percentage(num1, num2) {
  return (num1 * num2) / 100;
}

function operate(operator, num1, num2) {
  if (operator === "sum") {
    return sum(num1, num2);
  }
  if (operator === "minus") {
    return minus(num1, num2);
  }
  if (operator === "multiply") {
    return multiply(num1, num2);
  }
  if (operator === "division") {
    return division(num1, num2);
  }
  if (operator === "percentage"){
    return percentage(num1,num2)
  }
}

const display = document.getElementById("display");
const clearBtn = document.getElementById("btn-clear");
const calc = document.getElementById("calculator");

function appendDisplay(value) {
  display.innerHTML += value;
}
function clearDisplay() {
  display.innerHTML = "";
  number1 = "";
  number2 = "";
  operator = null;
}

let number1 = "";
let number2 = "";
let operator = null;
calc.addEventListener("click", (event) => {
  const eventId = event.target.id;

  if (number2==="Bad boy!" || number1==="Bad boy!"){
    clearDisplay();
  }


  // add to display
  if (
    eventId !== "btn-clear" &&
    eventId !== "equals" &&
    eventId !== "display" &&
    eventId !== "calculator"
  ) {
    appendDisplay(event.target.innerHTML);
  }
  //clear display
  if (eventId === "btn-clear") {
    clearDisplay();
  }

  // see if number or operator
  const btnType = event.target.className;

  // Avoid issues with pressing an operator first
  if (btnType === "operator-btn" && !number1 && !number2) {
    clearDisplay();
    return;
  }

  // if number store it
  if (btnType === "number-btn") {
    number2 += event.target.innerHTML;
  }
  // if operator, store a new number
  if (btnType === "operator-btn" && !operator) {
    operator = event.target.id;
    number1 = number2;
    number2 = "";
  }
  // if you press equal and the operator is not null
  if (event.target.id === "equals" && operator) {
    number1 = parseFloat(number1);
    number2 = parseFloat(number2);
    const result = operate(operator, number1, number2);
    clearDisplay();
    appendDisplay(result);
    number2 = result;
    operator = null;
  }
  // if you press equal, the operator is not null, and both numbers are present
  if (btnType === "operator-btn" && operator && number1 && number2) {
    number1 = parseFloat(number1);
    number2 = parseFloat(number2);
    const result = operate(operator, number1, number2);
    clearDisplay();
    appendDisplay(result);
    number1 = result;
    console.log(number2);
    operator = null;
  }
  
  if (btnType === "operator-btn" && !number2 && number1 && !operator) {
    appendDisplay(event.target.innerHTML);
    number2 = number2;
    const result = operate(operator, number1, number2);
    operator = event.target.id;
  }
  console.log(number1);
  console.log(number2);
  console.log(operator);
});
