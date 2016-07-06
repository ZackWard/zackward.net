var myCalc = {
    input: "0",
    clearInputFlag: false,
    operandOne: null,
    operandTwo: null,
    operator: null,
    inputDigit: function (digit) {
        // First, check to see if we need to clear the input before adding a new entry
        if (this.clearInputFlag === true) {
            this.clearInput();
            this.clearInputFlag = false;
        }
        // If we're inputting a decimal point, only add it if one doesn't already exist
        // in the input
        if (digit === "." && this.input.includes(".")) {
            return;
        }
        // Limit input to 15 characters
        if (this.input.length >= 20) {
            return;
        }
        this.input = "" + this.input + digit;
        // Clear leading zero unless the 2nd character is a decimal point
        if (this.input.length > 1 && this.input[0] === "0" && this.input[1] !== ".") {
            this.input = this.input.substring(1);
        }
    },
    inputOperator: function (operator) {
        // Move what is currently in input to operand one/two. 
        // This will also set the clear input flag
        // so that the next entry will be a new input
        this.moveInputToCalculator();
        // Perform the previous calculation
        this.calculate();
        // set the operator variable so that we can use it in the next calculate() call
        this.operator = operator;
    },
    calculate: function () {
        if (this.operandOne === null || this.operandTwo === null) {
            return;
        }
        var result;
        switch (this.operator) {
            case "add":
                result = this.operandOne + this.operandTwo;
                break;
            case "subtract":
                result = this.operandOne - this.operandTwo;
                break;
            case "multiply":
                result = this.operandOne * this.operandTwo;
                break;
            case "divide":
                result = this.operandOne / this.operandTwo;
                break;
            case "equal":
                break;
            default:
                result = null;
        }
        // round the result
        // result = Math.round(result);
        this.input = "" + result;
        this.operandOne = result;
    },
    performCalculation: function () {
        // We only call this function when somebody hits the equals sign
        this.moveInputToCalculator();
        this.calculate();
        this.clearInputFlag = true;
        this.operandOne = null;
        this.operandTwo = null;
        this.operator = null;
    },
    moveInputToCalculator: function () {
        if (this.operandOne === null) {
            this.operandOne = parseFloat(this.input);
        }
        else {
            this.operandTwo = parseFloat(this.input);
        }
        this.clearInputFlag = true;
    },
    clearInput: function () {
        this.input = "0";
    },
    clearAll: function () {
        this.clearInput();
        this.operandOne = null;
        this.operandTwo = null;
        this.operator = null;
    },
    delete: function () {
        this.input = this.input.split('');
        this.input.splice(this.input.length - 1, 1);
        this.input = this.input.join('');
        if (this.input.length === 0) {
            this.input = "0";
        }
    },
    reverseSign: function () {
        this.input = this.input.split('');
        if (this.input[0] === '-') {
            console.log("negative");
            this.input.shift();
        }
        else {
            console.log("positive");
            this.input.unshift('-');
        }
        this.input = this.input.join('');
    }
};
$(document).ready(function () {
    $('#calculator #buttons button').on('click', function () {
        var buttonName = $(this).attr('name');
        var operation = $(this).attr('operation');
        if (operation !== undefined) {
            myCalc.inputOperator(operation);
        }
        else if (myCalc.hasOwnProperty(buttonName)) {
            myCalc[buttonName]();
        }
        else {
            myCalc.inputDigit($(this).html());
        }
        // Update the input displayed
        $('#input').html(myCalc.input);
    });
});