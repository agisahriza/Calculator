const buttons = document.querySelectorAll(".button");
const displayH1 = document.querySelector(".display h1");
const displayH2 = document.querySelector(".display h2");

const calculator = {
  display: [],
  input: [],
  operator: [],
  titik: [],
};

const updateDisplay = () => {
  displayH1.innerText = calculator.display.join("");
};

const inputNumber = (angka) => {
  if (displayH1.innerText == "0" || calculator.display.length == "0") {
    if (angka == "000") {
      calculator.display[0] = "0";
      calculator.input[0] = "0";
    } else {
      calculator.display[0] = angka;
      calculator.input[0] = angka;
    }
  } else {
    if (angka == "000") {
      calculator.display.push("0", "0", "0");
      calculator.input.push("0", "0", "0");
    } else {
      calculator.display.push(angka);
      calculator.input.push(angka);
    }
  }
};

const inputOperator = (operator) => {
  const index = calculator.display.length - 1;
  if (index == calculator.titik[calculator.titik.length - 1]) {
    return;
  }
  if (index == calculator.operator[calculator.operator.length - 1]) {
    if (operator == "÷") {
      calculator.display[index] = ` ${operator} `;
      calculator.input[index] = "/";
    } else if (operator == "×") {
      calculator.display[index] = ` ${operator} `;
      calculator.input[index] = "*";
    } else {
      calculator.display[index] = ` ${operator} `;
      calculator.input[index] = operator;
    }
  } else {
    if (operator == "÷") {
      calculator.display.push(` ${operator} `);
      calculator.input.push("/");
    } else if (operator == "×") {
      calculator.display.push(` ${operator} `);
      calculator.input.push("*");
    } else {
      calculator.display.push(` ${operator} `);
      calculator.input.push(operator);
    }
    calculator.operator.push(calculator.display.length - 1);
  }
};

const clearCalculator = () => {
  calculator.display = [];
  calculator.input = [];
  calculator.operator = [];
  calculator.titik = [];
};

const deleteCalculator = () => {
  if (calculator.display.length == "1") {
    calculator.display[0] = "0";
    calculator.input[0] = "0";
  } else {
    const index = calculator.display.length - 1;
    if (index == calculator.operator[calculator.operator.length - 1]) {
      calculator.operator.pop();
    }
    if (index == calculator.titik[calculator.titik.length - 1]) {
      calculator.titik.pop();
    }
    calculator.display.pop();
    calculator.input.pop();
  }
};

const equalCalculator = () => {
  displayH1.innerText = `= ${eval(calculator.input.join(""))}`;
  displayH2.innerText = calculator.display.join("");
  displayH2.style.visibility = "visible";
  clearCalculator();
};

const negativeNumber = () => {
  if (calculator.operator.length == "0") {
    if (calculator.display[0] == "(" && calculator.display[1] == "-" && calculator.display[calculator.display.length - 1] == ")") {
      calculator.display.shift();
      calculator.display.shift();
      calculator.display.pop();

      calculator.input.shift();
      calculator.input.shift();
      calculator.input.pop();
    } else {
      calculator.display.unshift("(", "-");
      calculator.input.unshift("(", "-");

      calculator.display.push(")");
      calculator.input.push(")");
    }
  } else {
    const index = calculator.operator[calculator.operator.length - 1] + 1;

    if (calculator.display.length == index) {
      return;
    }

    if (calculator.display[index] == "(" && calculator.display[index + 1] == "-" && calculator.display[calculator.display.length - 1] == ")") {
      calculator.display.splice(index, 2);
      calculator.input.splice(index, 2);

      calculator.display.pop();
      calculator.input.pop();
    } else {
      calculator.display.splice(index, 0, "(", "-");
      calculator.input.splice(index, 0, "(", "-");

      calculator.display.push(")");
      calculator.input.push(")");
    }
  }
};

const inputPangkat = () => {
  calculator.display.push("^");
  calculator.input.push("**");
};

const inputTitik = () => {
  if (calculator.display.length == "0") {
    calculator.display.push("0");
    calculator.display.push(".");
    calculator.input.push("0");
    calculator.input.push(".");
    calculator.titik.push(calculator.display.length - 1);
  } else {
    if (calculator.display.length - 1 == calculator.operator[calculator.operator.length - 1]) {
      return;
    }

    if (calculator.titik.length != 0 && calculator.operator.length == 0) {
      return;
    }

    if (calculator.titik[calculator.titik.length - 1] > calculator.operator[calculator.operator.length - 1]) {
      return;
    }
    calculator.display.push(".");
    calculator.input.push(".");
    calculator.titik.push(calculator.display.length - 1);
  }
};

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.classList.contains("clear")) {
      clearCalculator();
      displayH1.innerText = "0";
      displayH2.style.visibility = "hidden";
      return;
    }

    if (button.classList.contains("delete")) {
      if (calculator.display.length != "0") {
        deleteCalculator();
        updateDisplay();
      }
      return;
    }

    if (button.classList.contains("operator")) {
      if (calculator.display.length != "0") {
        inputOperator(button.innerText);
        updateDisplay();
      }
      return;
    }

    if (button.classList.contains("equal")) {
      if (calculator.display.length != "0" && !(calculator.display.length - 1 == calculator.titik[calculator.titik.length - 1] || calculator.display.length - 1 == calculator.operator[calculator.operator.length - 1])) {
        equalCalculator();
      }
      return;
    }

    if (button.classList.contains("negative")) {
      if (calculator.display.length != "0") {
        negativeNumber();
        updateDisplay();
      }
      return;
    }

    if (button.classList.contains("pangkat")) {
      if (calculator.display.length != "0") {
        inputPangkat();
        updateDisplay();
      }
      return;
    }

    if (button.classList.contains("titik")) {
      inputTitik();
      updateDisplay();

      return;
    }

    inputNumber(button.innerText);
    displayH2.style.visibility = "hidden";
    updateDisplay();
  });
});
