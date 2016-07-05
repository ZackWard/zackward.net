class SimonGame {

    private buttons: string[];
    private sequence: string[];
    private input: string[];
    private locked: boolean;
    private powered: boolean;
    private strict: boolean;
    private maxSequence: number;
    private userInterface: any;
    
    constructor(elements) {
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

    on() {
        this.powered = true;
    }

    off() {
        this.powered = false;
        this.locked = true;
        this.input = [];
        this.sequence = [];
    }
    
    start() {
        if (! this.powered) {
            return;
        }
        this.userInterface.sequenceCount("New Game!");
        this.input = [];
        this.sequence = [];
        this.addRandomButton();
        this.play(1000);
        this.locked = false;
    }

    pressButton(color: string): boolean {
        if (this.buttons.indexOf(color) === -1 || this.locked === true) {
            return false;
        }

        this.lights(color);
        this.userInterface[color].sound.on();
        this.addInput(color);
    }

    private addInput(color: string) {

        this.input.push(color);

        // If the input is incorrect, reset the input array and let the player try again
        if (! this.inputIsCorrect()) 
        {
            this.wrong();
            return false;
        }

        // Input is correct, check to see if the player has won
        if (this.input.length === this.maxSequence) 
        {
            this.locked = true;
            this.win();

            // start a new game after about 5 seconds
            let game = this;
            window.setTimeout(() => {
                game.start();
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
    }

    private inputIsCorrect(): boolean {
        for (let i = 0; i < this.input.length; i++) {
            if (this.input[i] !== this.sequence[i])
            {
                return false;
            }
        }
        return true;
    }

    lights(button: string, status: string = 'on', duration: number = 500, delay: number = 0): boolean {
        // If we have invalid input, return false
        if (this.buttons.indexOf(button) === -1 || ['on', 'off'].indexOf(status) === -1) {
            return false;
        }

        window.setTimeout(this.userInterface[button].light[status], delay);

        // If there is a duration, call this function again with the opposite status
        if (duration > 1) {
            let reversal = status === 'on' ? 'off' : 'on';
            let game = this;
            window.setTimeout(function () {
                game.lights(button, reversal, 0);
            }, delay + duration);
        }

        return true;
    }

    sound(color: string) {
        this.userInterface[color].sound.on();
    }

    play(delay: number = 0) {
        this.locked = true;
        let game = this;
        let sequence = this.sequence;
        let updateCount = this.userInterface.sequenceCount;
        for (let i = 0; i < this.sequence.length; i++) {
            window.setTimeout(function () {
                game.lights(sequence[i], 'on', 500);
                updateCount(sequence.length);
                game.sound(sequence[i]);
            }, delay);
            delay += 800;
        }
        // After we play the sequence, unlock the input
        window.setTimeout(function () {
            game.unlock();
        }, delay - 299);
    }

    unlock() {
        this.locked = false;
    }

    setStrict(strict: boolean) {
        this.strict = strict;
    }

    win(color: string = "green") {
        if (! this.locked || ! this.powered) {
            return;
        }

        let lightOrder = {
            green: "red",
            red: "blue",
            blue: "yellow",
            yellow: "green"
        };

        this.userInterface.sequenceCount("You won!");
        this.lights(color, 'on', 200);
        
        let game = this;
        window.setTimeout(function () {
            game.win(lightOrder[color]);
        }, 300);
    }

    wrong() {
        this.lights('red', 'on', 250);
        this.lights('green', 'on', 250);
        this.lights('blue', 'on', 250);
        this.lights('yellow', 'on', 250);
        this.userInterface.sequenceCount('Incorrect!');

        if (this.strict) {
            // In strict mode, a wrong answer restarts the game
            this.locked = true;
            let game = this;
            window.setTimeout(() => {
                game.start();
            }, 750);
            return;
        }

        this.input = [];
        this.play(1150);
    }

    private addRandomButton(): void {
        this.sequence.push(this.buttons[Math.floor(Math.random() * this.buttons.length)]);
    }

}

// 160625-376486
