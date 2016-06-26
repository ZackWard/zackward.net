var SimonButton = (function () {
    function SimonButton(buttonColor) {
        this.settings = {
            color: buttonColor,
            on: null,
            off: null,
            pressFunction: null
        };
    }
    SimonButton.prototype.onPress = function (func) {
        if (typeof func === 'function') {
            this.settings.pressFunction = func;
        }
    };
    SimonButton.prototype.setAnimations = function (animations) {
        if (typeof animations.on === 'function') {
            this.settings.on = animations.on;
        }
        if (typeof animations.off === 'function') {
            this.settings.off = animations.off;
        }
        if (typeof animations.sound === 'function') {
            this.settings.sound = animations.sound;
        }
    };
    SimonButton.prototype.on = function () {
        if (typeof this.settings.on === 'function') {
            this.settings.on();
        }
    };
    SimonButton.prototype.off = function () {
        if (typeof this.settings.off === 'function') {
            this.settings.off();
        }
    };
    SimonButton.prototype.playSound = function () {
        if (typeof this.settings.sound === 'function') {
            this.settings.sound();
        }
    };
    SimonButton.prototype.flash = function (miliseconds) {
        var thisButton = this;
        this.on();
        this.playSound();
        window.setTimeout(function () { return thisButton.off(); }, miliseconds);
    };
    SimonButton.prototype.press = function () {
        if (typeof this.settings.pressFunction === 'function') {
            this.settings.pressFunction();
        }
    };
    return SimonButton;
}());
var SimonGame = (function () {
    function SimonGame() {
        this.sequenceLength = 5;
        this.input = [];
        this.sequence = [];
        this.buttons = [];
        this.locked = false;
        this.strict = false;
    }
    SimonGame.prototype.addButton = function (button) {
        var buttonIndex = this.buttons.push(button) - 1;
        var game = this;
        button.onPress(function () {
            if (game.locked) {
                return;
            }
            game.addInput(buttonIndex);
            button.flash(500);
        });
    };
    SimonGame.prototype.getRandomButton = function () {
        return this.buttons[Math.floor(Math.random() * this.buttons.length)];
    };
    SimonGame.prototype.addToSequence = function () {
        this.sequence.push(this.buttons.indexOf(this.getRandomButton()));
    };
    SimonGame.prototype.start = function () {
        this.sequence = [];
        this.input = [];
        this.addToSequence();
        this.playSequence(500, 830);
    };
    SimonGame.prototype.addInput = function (input) {
        if (this.locked) {
            return false;
        }
        this.input.push(input);
        // Case: Input is incorrect
        if (!this.isCorrect()) {
            console.log("Wrong!");
            this.input = [];
            // If we're playing strict mode, start a new game
            if (this.strict) {
                this.start();
                return false;
            }
            this.playSequence(500, 830);
            return false;
        }
        // Case: Input is correct, the length of the current sequence, and the length of the complete sequence, player has won
        if (this.isFinished() && this.isCorrect()) {
            // Celebrate
            console.log("You won!!!");
            this.won();
            return true;
        }
        // If the input was correct and the input matches the total sequence so far, add another button to the sequence and wait for more input
        if (this.isCorrect() && this.isInputFinished()) {
            console.log("You got it! Adding another button press to sequence and resetting input.");
            this.input = [];
            this.addToSequence();
            this.playSequence(500, 830);
            return true;
        }
        // Input is correct, but not the length of the current sequence, so just wait for more input
        return true;
    };
    SimonGame.prototype.isCorrect = function () {
        if (this.input.length === 0) {
            return false;
        }
        for (var i = 0; i < this.input.length; i++) {
            if (this.input[i] !== this.sequence[i]) {
                return false;
            }
        }
        return true;
    };
    SimonGame.prototype.isInputFinished = function () {
        if (this.input.length === this.sequence.length) {
            return true;
        }
        return false;
    };
    SimonGame.prototype.isFinished = function () {
        if (this.input.length === this.sequenceLength) {
            return true;
        }
        else {
            return false;
        }
    };
    SimonGame.prototype.playSequence = function (flashTime, delayIncrement) {
        this.locked = true;
        // Flash each button in the sequence for 1/2 second, with a 2/3 second delay between buttons
        var delay = 1000;
        var _loop_1 = function(i) {
            var thisButton = this_1.buttons[this_1.sequence[i]];
            window.setTimeout(function () { return thisButton.flash(flashTime); }, delay);
            delay = delay + delayIncrement;
        };
        var this_1 = this;
        for (var i = 0; i < this.sequence.length; i++) {
            _loop_1(i);
        }
        var thisGame = this;
        window.setTimeout(function () { return thisGame.locked = false; }, delay);
    };
    SimonGame.prototype.won = function () {
        console.log("You won!");
        this.sequence = [];
        this.input = [];
    };
    return SimonGame;
}());
// 160625-376486
//# sourceMappingURL=simon.js.map