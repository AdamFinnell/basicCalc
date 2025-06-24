const display = document.querySelector("#display")
const currentInput = "0"
const operator = null
const previousInput = null
const awaitingOperand = false

const themeToggle = document.querySelector("#themeToggle")
const body = document.body

themeToggle.addEventListener("change", function() {
    if(this.checked){
        body.setAttribute("data-theme", "light")
    }else {
        body.removeAttribute("data-theme")
    }
})

function updateDisplay() {
    event.target.classList.add("btn-pressed")
    setTimeout(() => {
        event.target.classList.remove("btn-pressed")
    }, 200)

if (awaitingOperand){
    currentInput = value
    awaitingOperand = false
}else {
    if(value === "." && currentInput.includes(".")){
        return
    }
    currentInput = currentInput === "0" ? value : currentInput + value
  }
  updateDisplay()
}

function clearDisplay() {
    currentInput = "0"
    operator = null
    previousInput = null
    awaitingOperand = false
    updateDisplay()

    display.computedStyleMap.boxShadow = "inset 0 0 20px rgba(0, 255, 65, 0.5), 0 0 20px rgba(0, 255, 65, 0.5)"
            setTimeout(() => {
                display.style.boxShadow = "inset 0 0 20px rgba(0, 255, 255, 0.2), 0 0 20px rgba(0, 255, 255, 0.3)"
            }, 300)
        }
clearEntry(){
    currentInput = "0"
    updateDisplay()
}

function calculate(){
    event.target.classList.add("btn-pressed")
    setTimeout(() => {
        event.target.classList.remove("btn-pressed")
    }, 200)

    let result
    const prev = parseFloat(previousInput)
    const current = parseFloat(currentInput)
    if(isNaN(prev) || isNaN(current)) return

    switch(operator){
        case "+": result = prev + current
        case "-": result = prev - current
        case "*": result = prev * current
        case "/": if(current === 0){
            alert("Cannot divide by zero!")
            return
        }
        result = prev / current
        break;
        default: return
    }

    result = Math.round((result + Number.EPSILON) * 100) / 100
    currentInput = result.toString()
    operator = null
    previousInput = null
    awaitingOperand = true
    updateDisplay()

    display.style.boxShadow = "inset 0 0 20px rgba(255, 0, 255, 0.5), 0 0 20px rgba(255, 0, 255, 0.5)"
    setTimeout(() =>{
        display.style.boxShadow = "inset 0 0 20px rgba(0, 255, 255, 0.2), 0 0 20px rgba(0, 255, 255, 0.3)"
    }, 500)
}

document.querySelectorAll(".btn-operator").forEach