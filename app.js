// -- DOM elements --
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

// -- State --
// currentValue is kept as a string while typing to make digit appending easy.
let currentValue = "0";
let previousValue = null;
let operator = null;
let shouldResetDisplay = false; // When true, the next digit starts a new number (after operator/equals).

// -- Render helpers --
function updateDisplay() {
  display.textContent = currentValue;
}

// -- Core Logic --
function handleEquals() {
  if (previousValue == null || operator == null) {
    return;
  }

  const prev = Number(previousValue);
  const current = Number(currentValue);

  let result;

  if (operator === "+") {
    result = prev + current;
  } else if (operator === "-") {
    result = prev - current;
  } else if (operator === "*") {
    result = prev * current;
  } else if (operator === "/") {
    result = prev / current;
  } else {
    // unknown operator, just bail
    return;
  }

  currentValue = result.toString();
  previousValue = null;
  operator = null;
  shouldResetDisplay = true;
  updateDisplay();
}

// -- User actions --
// Reset calculator to its initial neutral state.
function clearAll() {
  currentValue = "0";
  previousValue = null;
  operator = null;
  shouldResetDisplay = false;
  updateDisplay();
}

function setOperator(op) {
  // Move currentValue to previousValue
  previousValue = currentValue;
  // Store the chosen operator
  operator = op;
  // Make sure next digit stays fresh
  shouldResetDisplay = true;
}

function deleteLastDigit() {
  if (shouldResetDisplay == true) {
    return;
  } else if (currentValue.length === 1) {
    currentValue = "0";
  } else {
    currentValue = currentValue.slice(0, -1);
  }
  updateDisplay();
}

// Add a digit to the current number being typed.
// Replace leading 0 or start fresh after an operator; otherwise append.
function appendNumber(num) {
  // Replace leading "0" or start fresh after an operator; otherwise append digits.
  if (currentValue === "0" || shouldResetDisplay) {
    currentValue = num;
    shouldResetDisplay = false;
  } else {
    currentValue += num;
  }
  updateDisplay();
}

// -- Event wiring --
// Route clicks by inspecting data-number / data-action attributes.
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const number = btn.dataset.number;
    const action = btn.dataset.action;
    const op = btn.dataset.operator;

    if (number !== undefined) {
      appendNumber(number);
      return;
    }

    if (op !== undefined) {
      setOperator(op);
      return;
    }
    if (action === "equals") {
      handleEquals();
      return;
    }

    if (action === "delete") {
      deleteLastDigit();
      return;
    }

    if (action === "clear") {
      clearAll();
      return;
    }
  });
});
