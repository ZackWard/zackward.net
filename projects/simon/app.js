var myGame = null;

function getButtonCallbacks (button) {
    return {
        light: {
            on: function () {
                $('#' + button).addClass('on');
            },
            off: function () {
                $('#' + button).removeClass('on');
            }
        },
        sound: {
            on: function () {
                return createjs.Sound.play(button);
            }
        }
    };
}

$(document).ready(function () {
    // Load our sounds
    createjs.Sound.registerSound("https://assets.zackward.net/simonSound1.mp3", 'red');
    createjs.Sound.registerSound("https://assets.zackward.net/simonSound2.mp3", 'green');
    createjs.Sound.registerSound("https://assets.zackward.net/simonSound3.mp3", 'blue');
    createjs.Sound.registerSound("https://assets.zackward.net/simonSound4.mp3", 'yellow');

    // All we should need to do is bind our DOM elements to our game object
    var gameElements = {
        red: getButtonCallbacks('red'),
        green: getButtonCallbacks('green'),
        blue: getButtonCallbacks('blue'),
        yellow: getButtonCallbacks('yellow'),
        sequenceCount: function (seqCount) {
            $('#sequence-count').html(seqCount);
        }
    };

    myGame = new SimonGame(gameElements);

    // And attach our event handlers
    var colors = ['red', 'green', 'blue', 'yellow'];
    colors.map(function (color) {
        $('#' + color).on('click', function () {
            myGame.pressButton(color);
        });
    });

    $('#onButton').click(function () {
        if ($(this).prop('checked')) {
            $('#startButton').prop('disabled', false);
            $('#strictButton').prop('disabled', false);
            myGame.on();
        } else {
            $('#startButton').prop('disabled', true);
            $('#strictButton').prop('disabled', true);
            $('#sequence-count').html("--");
            myGame.off();
        }
    });

    $('#startButton').click(function () {
        myGame.start();
    });

    $('#strictButton').click(function () {
        if ($(this).prop('checked')) {
            myGame.setStrict(true);
        } else {
            myGame.setStrict(false);
        }
    });
});