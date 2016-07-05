var SimonGame = (function () {
    function SimonGame(elements) {
        // These variables keep track of the internal state of the game
        this.buttons = ['red', 'green', 'blue', 'yellow'];
        this.sequence = [];
        this.input = [];
        this.powered = false;
        this.locked = true;
        this.maxSequence = 20;
        // Connect our user interface
        this.userInterface = elements;
    }
    SimonGame.prototype.on = function () {
        this.powered = true;
    };
    SimonGame.prototype.off = function () {
        this.powered = false;
        this.locked = true;
        this.input = [];
        this.sequence = [];
    };
    SimonGame.prototype.start = function () {
        if (!this.powered) {
            return;
        }
        this.userInterface.sequenceCount("New Game!");
        this.input = [];
        this.sequence = [];
        this.addRandomButton();
        this.play(1000);
        this.locked = false;
    };
    SimonGame.prototype.pressButton = function (color) {
        if (this.buttons.indexOf(color) === -1 || this.locked === true) {
            return false;
        }
        this.lights(color);
        this.userInterface[color].sound.on();
        this.addInput(color);
    };
    SimonGame.prototype.addInput = function (color) {
        this.input.push(color);
        // If the input is incorrect, reset the input array and let the player try again
        if (!this.inputIsCorrect()) {
            this.wrong();
            return false;
        }
        // Input is correct, check to see if the player has won
        if (this.input.length === this.maxSequence) {
            this.locked = true;
            this.win();
            // start a new game after about 5 seconds
            var game_1 = this;
            window.setTimeout(function () {
                game_1.start();
            }, 5000);
            return true;
        }
        // Input is correct, but we haven't won yet. If the input length is the same as the sequence length
        // then we need to clear the input and add another button to the sequence
        if (this.input.length === this.sequence.length) {
            this.input = [];
            this.addRandomButton();
            this.play(1000);
        }
        return true;
    };
    SimonGame.prototype.inputIsCorrect = function () {
        for (var i = 0; i < this.input.length; i++) {
            if (this.input[i] !== this.sequence[i]) {
                return false;
            }
        }
        return true;
    };
    SimonGame.prototype.lights = function (button, status, duration, delay) {
        if (status === void 0) { status = 'on'; }
        if (duration === void 0) { duration = 500; }
        if (delay === void 0) { delay = 0; }
        // If we have invalid input, return false
        if (this.buttons.indexOf(button) === -1 || ['on', 'off'].indexOf(status) === -1) {
            return false;
        }
        window.setTimeout(this.userInterface[button].light[status], delay);
        // If there is a duration, call this function again with the opposite status
        if (duration > 1) {
            var reversal_1 = status === 'on' ? 'off' : 'on';
            var game_2 = this;
            window.setTimeout(function () {
                game_2.lights(button, reversal_1, 0);
            }, delay + duration);
        }
        return true;
    };
    SimonGame.prototype.sound = function (color) {
        this.userInterface[color].sound.on();
    };
    SimonGame.prototype.play = function (delay) {
        if (delay === void 0) { delay = 0; }
        this.locked = true;
        var game = this;
        var sequence = this.sequence;
        var updateCount = this.userInterface.sequenceCount;
        var _loop_1 = function(i) {
            window.setTimeout(function () {
                game.lights(sequence[i], 'on', 500);
                updateCount(sequence.length);
                game.sound(sequence[i]);
            }, delay);
            delay += 800;
        };
        for (var i = 0; i < this.sequence.length; i++) {
            _loop_1(i);
        }
        // After we play the sequence, unlock the input
        window.setTimeout(function () {
            game.unlock();
        }, delay - 299);
    };
    SimonGame.prototype.unlock = function () {
        this.locked = false;
    };
    SimonGame.prototype.setStrict = function (strict) {
        this.strict = strict;
    };
    SimonGame.prototype.win = function (color) {
        if (color === void 0) { color = "green"; }
        if (!this.locked || !this.powered) {
            return;
        }
        var lightOrder = {
            green: "red",
            red: "blue",
            blue: "yellow",
            yellow: "green"
        };
        this.userInterface.sequenceCount("You won!");
        this.lights(color, 'on', 200);
        var game = this;
        window.setTimeout(function () {
            game.win(lightOrder[color]);
        }, 300);
    };
    SimonGame.prototype.wrong = function () {
        this.lights('red', 'on', 250);
        this.lights('green', 'on', 250);
        this.lights('blue', 'on', 250);
        this.lights('yellow', 'on', 250);
        this.userInterface.sequenceCount('Incorrect!');
        if (this.strict) {
            // In strict mode, a wrong answer restarts the game
            this.locked = true;
            var game_3 = this;
            window.setTimeout(function () {
                game_3.start();
            }, 750);
            return;
        }
        this.input = [];
        this.play(1150);
    };
    SimonGame.prototype.addRandomButton = function () {
        this.sequence.push(this.buttons[Math.floor(Math.random() * this.buttons.length)]);
    };
    return SimonGame;
}());
// 160625-376486
//# sourceMappingURL=simon.js.map