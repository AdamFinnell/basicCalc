 let display = document.querySelector('#display');
 let expressionDisplay = document.querySelector('#expression');
        let currentInput = '0';
        let operator = null;
        let previousInput = null;
        let waitingForOperand = false;

        
        const themeToggle = document.querySelector('#themeToggle');
        const body = document.body;

        themeToggle.addEventListener('change', function() {
            if (this.checked) {
                body.setAttribute('data-theme', 'light');
            } else {
                body.removeAttribute('data-theme');
            }
        });

        function updateDisplay() {
            display.textContent = currentInput;
        }

        function appendToDisplay(value) {
            
            event.target.classList.add('btn-pressed');
            setTimeout(() => {
                event.target.classList.remove('btn-pressed');
            }, 200);

            if (waitingForOperand) {
                currentInput = value;
                waitingForOperand = false;
            } else {
                if (value === '.' && currentInput.includes('.')) {
                    return; 
                }
                currentInput = currentInput === '0' ? value : currentInput + value;
            }
            updateDisplay();
        }

        function clearDisplay() {
            currentInput = '0';
            operator = null;
            previousInput = null;
            waitingForOperand = false;
            updateDisplay();
            expressionDisplay.textContent = ''; 
           
            display.style.boxShadow = 'inset 0 0 20px rgba(0, 255, 65, 0.5), 0 0 20px rgba(0, 255, 65, 0.5)';
            setTimeout(() => {
                display.style.boxShadow = 'inset 0 0 20px rgba(0, 255, 255, 0.2), 0 0 20px rgba(0, 255, 255, 0.3)';
            }, 300);
        }

        function clearEntry() {
            currentInput = '0';
            updateDisplay();
        }

        function calculate() {
            
            event.target.classList.add('btn-pressed');
            setTimeout(() => {
                event.target.classList.remove('btn-pressed');
            }, 200);

            let result;
            const prev = parseFloat(previousInput);
            const current = parseFloat(currentInput);

            if (isNaN(prev) || isNaN(current)) return;

            switch (operator) {
                case '+':
                    result = prev + current;
                    break;
                case '-':
                    result = prev - current;
                    break;
                case '*':
                    result = prev * current;
                    break;
                case '/':
                    if (current === 0) {
                        alert('Cannot divide by zero!');
                        return;
                    }
                    result = prev / current;
                    break;
                default:
                    return;
            }

         
            result = Math.round((result + Number.EPSILON) * 100) / 100;
            expressionDisplay.textContent = `${previousInput} ${operator} ${current} =`;

            currentInput = result.toString();
            operator = null;
            previousInput = null;
            waitingForOperand = true;
            updateDisplay();

            display.style.boxShadow = 'inset 0 0 20px rgba(255, 0, 255, 0.5), 0 0 20px rgba(255, 0, 255, 0.5)';
            setTimeout(() => {
                display.style.boxShadow = 'inset 0 0 20px rgba(0, 255, 255, 0.2), 0 0 20px rgba(0, 255, 255, 0.3)';
            }, 500);
        }

        
        document.querySelectorAll('.btn-operator').forEach(btn => {
    if (!btn.textContent.includes('C')) {
        btn.addEventListener('click', function () {
            const value = this.textContent === '×' ? '*' : this.textContent;

            
            if (waitingForOperand) {
                operator = value;
                expressionDisplay.textContent = `${previousInput} ${operator}`;
                return;
            }

            if (operator && !waitingForOperand) {
                calculate();
            }

            previousInput = currentInput;
            operator = value;
            waitingForOperand = true;

            expressionDisplay.textContent = `${previousInput} ${operator}`;
        });
    }
});

        
        document.addEventListener('keydown', function(event) {
            const key = event.key;
            
            if (key >= '0' && key <= '9') {
                appendToDisplay(key);
            } else if (key === '.') {
                appendToDisplay(key);
            } else if (key === '+' || key === '-') {
                document.querySelector(`[onclick="appendToDisplay('${key}')"]`).click();
            } else if (key === '*') {
                document.querySelector(`[onclick="appendToDisplay('*')"]`).click();
            } else if (key === '/') {
                event.preventDefault();
                document.querySelector(`[onclick="appendToDisplay('/')"]`).click();
            } else if (key === 'Enter' || key === '=') {
                calculate();
            } else if (key === 'Escape' || key === 'c' || key === 'C') {
                clearDisplay();
            } else if (key === 'Backspace') {
                if (currentInput.length > 1) {
                    currentInput = currentInput.slice(0, -1);
                } else {
                    currentInput = '0';
                }
                updateDisplay();
            }
        });

       
        updateDisplay();