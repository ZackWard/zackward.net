class SimonButton {

    protected settings;

    constructor(buttonColor: string) {
        this.settings = {
            color: buttonColor,
            on: null,
            off: null,
            pressFunction: null
        };
    }

    onPress(func) {
        if (typeof func === 'function') {
            this.settings.pressFunction = func;
        }   
    }

    setAnimations(animations) {
        if (typeof animations.on === 'function') {
            this.settings.on = animations.on;
        }
        if (typeof animations.off === 'function') {
            this.settings.off = animations.off;
        }
        if (typeof animations.sound === 'function') {
            this.settings.sound = animations.sound;
        } 
    }

    on() {
        if (typeof this.settings.on === 'function') {
            this.settings.on();
        }
    }

    off() {
        if (typeof this.settings.off === 'function') {
            this.settings.off();
        }
    }

    playSound() {
        if (typeof this.settings.sound === 'function') {
            this.settings.sound();
        }
    }

    flash(miliseconds: number) {
        let thisButton = this;
        this.on();
        this.playSound();
        window.setTimeout(() => thisButton.off(), miliseconds);
    }

    press() {
        if (typeof this.settings.pressFunction === 'function') {
            this.settings.pressFunction();
        }
    }

}

class SimonGame {

    public buttons: SimonButton[];
    protected sequence: number[];
    protected sequenceLength: number;
    protected input: number[];
    public locked: boolean;
    protected strict: boolean;

    constructor() {
        this.sequenceLength = 5;
        this.input = [];
        this.sequence = [];
        this.buttons = [];
        this.locked = false;
        this.strict = false;
    }

    addButton(button: SimonButton) {
        let buttonIndex = this.buttons.push(button) - 1;
        let game = this;
        button.onPress(function () {
            if (game.locked) {
                return;
            }
            game.addInput(buttonIndex);
            button.flash(500);
        });
    }

    getRandomButton(): SimonButton {
        return this.buttons[Math.floor(Math.random() * this.buttons.length)];
    }

    addToSequence() {
        this.sequence.push(this.buttons.indexOf(this.getRandomButton()));
    }

    start() {
        this.sequence = [];
        this.input = [];
        this.addToSequence();
        this.playSequence(500, 830);
    }

    addInput(input): boolean {
        if (this.locked) {
            return false;
        }

        this.input.push(input);

        // Case: Input is incorrect
        if (! this.isCorrect()) {
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
    }

    isCorrect() : boolean {
        if (this.input.length === 0) {
            return false;
        }
        for (let i = 0; i < this.input.length; i++) {
            if (this.input[i] !== this.sequence[i]) {
                return false;
            }
        }
        return true;
    }

    isInputFinished(): boolean {
        if (this.input.length === this.sequence.length) {
            return true;
        }
        return false;
    }

    isFinished() : boolean {
        if (this.input.length === this.sequenceLength) {
            return true;
        } else {
            return false;
        }
    }

    playSequence(flashTime: number, delayIncrement: number) {
        this.locked = true;
        // Flash each button in the sequence for 1/2 second, with a 2/3 second delay between buttons
        let delay = 1000;
        for (let i = 0; i < this.sequence.length; i++) {
            let thisButton = this.buttons[this.sequence[i]];
            window.setTimeout(() => thisButton.flash(flashTime), delay);
            delay = delay + delayIncrement;
        }
        let thisGame: SimonGame = this;
        window.setTimeout(() => thisGame.locked = false, delay);
    }

    won() {
        console.log("You won!");
        this.sequence = [];
        this.input = [];
    }
}

// 160625-376486
