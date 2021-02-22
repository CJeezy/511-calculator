class Calculator {
  constructor(prevOperandHTML, currOperandHTML) {
    this.prevOperandHTML = prevOperandHTML
    this.currOperandHTML = currOperandHTML
    this.clear()
  }

  //addNumber simply adds the innerHTML value of the button, so its number value,
  //to be the current operand
  addNumToDisplay(number) {
    this.currOperand = this.currOperand.toString() + number.toString()
  }
  
  //
  updateDisplay() {
    this.currOperandHTML.innerText = this.currOperand
  }

  //makes sure that only one operand is allowed to be used at a time.
  //if it passes the if statement, calls compute.
  chooseOperation(operation) {
    this.operation = operation
    this.prevOperand = this.currOperand
    this.currOperand = ''

    if (this.currOperand === '') return
    if (this.prevOperand !== '') {
      this.compute()
    }
  }

  //chooses what calculation to do based on the operation passed
  compute() {
    var result
    const prev = parseFloat(this.prevOperand)
    const current = parseFloat(this.currOperand)
    switch (this.operation) {
      case '+':
        result = prev + current
        break
      case '-':
        result = prev - current
        break
      case '*':
        result = prev * current
        break
      case '÷':
        result = prev / current
        break
      case '^':
        result = Math.pow(prev, current)
        break
      default:
        return
    }
    this.currOperand = result
    this.operation = undefined
    this.prevOperand = ''
  }
  
  //clears the entire calculator, defaulting HTML values to ''
  clear() {
    this.currOperand = ''
    this.prevOperand = ''
    this.operation = undefined
  }

}

const prevOperandHTML = document.querySelector('[prevOperand]')
const currOperandHTML = document.querySelector('[currOperand]')
const calculator = new Calculator(prevOperandHTML, currOperandHTML)

//instead of if statements to find specify what button is pressed
//i used variables for each of the types of keys and added eventlisteners
//on each, which will call the function needed.
const numberKeys = document.querySelectorAll('[number]')
const operatorKeys = document.querySelectorAll('[operation]')
const equalsKey = document.querySelector('[equals]')
const allClearKey = document.querySelector('[all-clear]')

//if a number key is pressed, call addNumber and updateDisplay
numberKeys.forEach(button => {
  button.addEventListener('click', () => {
    calculator.addNumToDisplay(button.innerText)
    calculator.updateDisplay()
  })
})

operatorKeys.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalsKey.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})

allClearKey.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})
