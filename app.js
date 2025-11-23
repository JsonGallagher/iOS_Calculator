// ==== DOM elements ====
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

// ==== State ====
// currentValue is kept as a string while typing to make digit appending easy.
let currentValue = "0";
let previousValue = null;
let operator = null;
// When true, the next digit starts a new number (after operator/equals).
let shouldResetDisplay = false;

// ==== Helper / handler functions ====
function updateDisplay() {
  display.textContent = currentValue;
}

// Reset calculator to its initial neutral state.
function clearAll() {
  currentValue = "0";
  previousValue = null;
  operator = null;
  shouldResetDisplay = false;
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

// ==== Event wiring ====
// Route clicks by inspecting data-number / data-action attributes.
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const number = btn.dataset.number;
    const action = btn.dataset.action;

    if (number !== undefined) {
      appendNumber(number);
      return;
    }

    if (action === "clear") {
      clearAll();
      return;
    }
  });
});
