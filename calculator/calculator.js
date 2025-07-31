class Calculator {
      constructor(previousOperandElement, currentOperandElement) {
        this.previousOperandElement = previousOperandElement;
        this.currentOperandElement = currentOperandElement;
        this.clear();
      }
      
      clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
        this.updateDisplay();
      }
      
      delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1) || '0';
        this.updateDisplay();
      }
      
      appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand === '0' ? number : this.currentOperand + number;
        this.updateDisplay();
      }
      
      chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
          this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
        this.updateDisplay();
      }
      
      compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        
        switch (this.operation) {
          case 'add':
            computation = prev + current;
            break;
          case 'subtract':
            computation = prev - current;
            break;
          case 'multiply':
            computation = prev * current;
            break;
          case 'divide':
            computation = prev / current;
            break;
          default:
            return;
        }
        
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
        this.updateDisplay();
      }
      
      updateDisplay() {
        this.currentOperandElement.innerText = this.currentOperand;
        
        if (this.operation != null) {
          const operationSymbol = {
            add: '+',
            subtract: '-',
            multiply: '×',
            divide: '÷'
          }[this.operation];
          
          this.previousOperandElement.innerText = `${this.previousOperand} ${operationSymbol}`;
        } else {
          this.previousOperandElement.innerText = '';
        }
      }
    }
    
    const numberButtons = document.querySelectorAll('[data-action="number"]');
    const operationButtons = document.querySelectorAll('[data-action="add"], [data-action="subtract"], [data-action="multiply"], [data-action="divide"]');

    const equalsButton = document.querySelector('[data-action="equals"]');
    const deleteButton = document.querySelector('[data-action="delete"]');
    const clearButton = document.querySelector('[data-action="clear"]');
    const decimalButton = document.querySelector('[data-action="decimal"]');
    const previousOperandElement = document.querySelector('.previous-operand');
    const currentOperandElement = document.querySelector('.current-operand');
    
    const calculator = new Calculator(previousOperandElement, currentOperandElement);
    
    numberButtons.forEach(button => {
      button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
      });
    });
    
    operationButtons.forEach(button => {
      button.addEventListener('click', () => {
        calculator.chooseOperation(button.dataset.action);
      });
    });
    
    equalsButton.addEventListener('click', () => {
      calculator.compute();
    });
    
    clearButton.addEventListener('click', () => {
      calculator.clear();
    });
    
    deleteButton.addEventListener('click', () => {
      calculator.delete();
    });
    
    decimalButton.addEventListener('click', () => {
      calculator.appendNumber('.');
    });
    
    // Keyboard support
    document.addEventListener('keydown', (e) => {
      if (e.key >= '0' && e.key <= '9') {
        calculator.appendNumber(e.key);
      } else if (e.key === '.') {
        calculator.appendNumber('.');
      } else if (['+', '-', '*', '/'].includes(e.key)) {
        const action = {
          '+': 'add',
          '-': 'subtract',
          '*': 'multiply',
          '/': 'divide'
        }[e.key];
        calculator.chooseOperation(action);
      } else if (e.key === 'Enter' || e.key === '=') {
        calculator.compute();
      } else if (e.key === 'Backspace') {
        calculator.delete();
      } else if (e.key === 'Escape') {
        calculator.clear();
      }
    });