let myGame = new SimonGame();
let redButton = new SimonButton("Red");
let greenButton = new SimonButton("Green");
let blueButton = new SimonButton("Blue");
let yellowButton = new SimonButton("Yellow");
myGame.addButton(redButton);
myGame.addButton(greenButton);
myGame.addButton(blueButton);
myGame.addButton(yellowButton);

function getAnimationFunctions(element, sound) {
    return {
        on: function () {
            element.addClass('on');
        },
        off: function () {
            element.removeClass('on');
        },
        sound: function () {
            createjs.Sound.play(sound);
        }
    };
}

// Connect the divs to the buttons
$(document).ready(function () {
    // Load our sounds
    createjs.Sound.registerSound("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3", 'sound1');
    createjs.Sound.registerSound("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3", 'sound2');
    createjs.Sound.registerSound("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3", 'sound3');
    createjs.Sound.registerSound("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3", 'sound4');

    // Set up red button
    let redElement = $('#red');
    redButton.setAnimations(getAnimationFunctions(redElement, 'sound1'));
    redElement.on('click', function () {
        redButton.press();
    });

    // Set up green button
    let greenElement = $('#green');
    greenButton.setAnimations(getAnimationFunctions(greenElement, 'sound2'));
    greenElement.on('click', function () {
        greenButton.press();
    });

    // Set up blue button
    let blueElement = $('#blue');
    blueButton.setAnimations(getAnimationFunctions(blueElement, 'sound3'));
    blueElement.on('click', function () {
        blueButton.press();
    });

    // Set up yellow button
    let yellowElement = $('#yellow');
    yellowButton.setAnimations(getAnimationFunctions(yellowElement, 'sound4'));
    yellowElement.on('click', function () {
        yellowButton.press();
    });

    myGame.start();
    
});