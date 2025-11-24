# iOS Calculator (HTML/CSS Grid + Vanilla JS)

A lightweight calculator app built while working through a web development tutorial.  
The interface uses **CSS Grid** for the keypad layout, and all behavior is implemented in **vanilla JavaScript**.

This repo is intentionally simple and incremental, so it’s easy to learn from.

---

## Demo

A brief demo video of the calculator in action:

[▶️ Watch Calc_Demo.mp4](demo/Calc_Demo.mp4)

## Features (current)

- iOS‑style calculator layout
- Display area with monospace “readout” vibe
- Number input
- Clear (`C`) button

---

## Tech Stack

- HTML5
- CSS3 (Grid + Flexbox)
- Vanilla JavaScript (no frameworks)

---

## Project Structure

```text
iOS_Calculator/
├── index.html      # Markup + button grid
├── styles.css      # Layout + styling
├── app.js          # Calculator state + click handlers
└── README.md
```

---

## How It Works (high level)

### HTML

Buttons are labeled with `data-*` attributes so JavaScript can route clicks cleanly:

- `data-number="7"` → number input
- `data-operator="+"` → operator selection (to be wired)
- `data-action="clear"` → clear/reset
- `data-action="delete"` → delete last digit (to be wired)
- `data-action="equals"` → compute result (to be wired)

### JavaScript

The calculator keeps a small state machine:

- `currentValue` — the number being typed (string while typing)
- `previousValue` — stored number after choosing an operator
- `operator` — the pending operator (`+ - * /`)
- `shouldResetDisplay` — when `true`, next digit starts a new number

UI updates flow through a single render function:

```js
function updateDisplay() {
  display.textContent = currentValue;
}
```

---

## Running Locally

No build tools needed.

1. Open `index.html` in your browser
2. Click the buttons 🎛️

---

## Next Steps / TODO

- Add keyboard input
- Match iOS behavior more closely (`%`, `±`, chaining rules)

---

## Learning Goals

- Practice HTML structure for a real UI
- Use CSS Grid for keypad layouts
- Route events with `data-*` attributes
- Implement state‑driven UI in plain JS

---
