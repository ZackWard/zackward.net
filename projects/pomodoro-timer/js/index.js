var PomodoroTimer = (function () {
    function PomodoroTimer(options) {
        // Set up sound
        this.audioPlayer = options.sound;
        this.audioPlayer.registerSound("https://assets.zackward.net/Gentle%20Roll.mp3", "ding");
        this.audioPlayer.registerSound("https://assets.zackward.net/Hope.mp3", "ding2");
        // Bind to a clock display element
        this.clock = options.clock;
        // Bind to a progress display element
        this.progressDisplay = options.progressDisplay;
        this.running = false;
        this.break = false;
        this.settings = {
            pomodoroLength: 1500,
            pomodoros: 4,
            break: 300
        };
        // Initially, set the seconds counter to the pomodoroLength
        this.seconds = this.settings.pomodoroLength;
        this.pomodoros = 0;
    }
    PomodoroTimer.prototype.ding = function () {
        if (this.audioPlayer) {
            this.audioPlayer.play("ding");
        }
    };
    PomodoroTimer.prototype.ding2 = function () {
        if (this.audioPlayer) {
            this.audioPlayer.play("ding2");
        }
    };
    PomodoroTimer.prototype.start = function () {
        this.running = true;
        this.draw();
        var thisTimer = this;
        this.interval = window.setInterval(function () { return thisTimer.tick(); }, 1000);
    };
    PomodoroTimer.prototype.stop = function () {
        if (this.interval !== null) {
            window.clearInterval(this.interval);
            this.interval = null;
        }
        this.running = false;
        this.draw();
    };
    PomodoroTimer.prototype.reset = function () {
        this.stop();
        this.pomodoros = 0;
        this.seconds = this.settings.pomodoroLength;
        this.draw();
        this.drawProgress();
    };
    PomodoroTimer.prototype.tick = function () {
        if (this.seconds >= 1) {
            this.seconds--;
            this.draw();
            return;
        }
        // Ok, we're at the end of a timer. Toggle break/pomodoro, or finish
        if (this.break) {
            // We're finishing a break, go back to work.
            this.ding2();
            this.seconds = this.settings.pomodoroLength;
            this.break = false;
        }
        else {
            // We're finishing a pomodoro. Take a break.
            this.ding();
            this.pomodoros++;
            this.drawProgress();
            // Check to see if we're done
            if (this.pomodoros == this.settings.pomodoros) {
                this.stop();
                return;
            }
            else {
                // Ok, we still have more work to do. But first, we'll take a short break
                this.seconds = this.settings.break;
                this.break = true;
            }
        }
    };
    PomodoroTimer.prototype.draw = function () {
        var minutes = Math.floor(this.seconds / 60);
        var seconds = this.seconds % 60;
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        var display = "<h1>" + minutes + ":" + seconds + "</h1>";
        // Set a status display so that the user knows whether the timer is for a pom or a break
        if (this.running) {
            if (this.break) {
                display += "<p>Enjoy your break!</p>";
            }
            else {
                display += "<p>Pomodoro in progress!</p>";
            }
        }
        // Update the DOM
        this.clock.html(display);
    };
    PomodoroTimer.prototype.drawProgress = function () {
        var displayOutput = "";
        var finished = this.pomodoros;
        for (var i = 1; i <= this.settings.pomodoros; i++) {
            if (finished > 0) {
                // Add the finished icon, and subtract 1 from finished
                displayOutput = displayOutput + '<img src="https://assets.zackward.net/pomodoro-finished.png">';
                finished--;
            }
            else {
                // Add the pomodoro icon
                displayOutput = displayOutput + '<img src="https://assets.zackward.net/pomodoro.png">';
            }
        }
        displayOutput = displayOutput + "<p>You've completed " + this.pomodoros + " of " + this.settings.pomodoros + " Pomodoros!</p>";
        // Draw the progress display
        this.progressDisplay.html(displayOutput);
    };
    PomodoroTimer.prototype.setTime = function (seconds) {
        this.seconds = seconds;
        this.draw();
    };
    PomodoroTimer.prototype.setPomodoroTime = function (seconds) {
        this.settings.pomodoroLength = seconds;
        if (!this.break) {
            this.seconds = seconds;
            this.draw();
        }
    };
    PomodoroTimer.prototype.setBreakTime = function (seconds) {
        this.settings.break = seconds;
        if (this.break) {
            this.seconds = seconds;
            this.draw();
        }
    };
    PomodoroTimer.prototype.setPomodoros = function (poms) {
        this.settings.pomodoros = poms;
        this.drawProgress();
    };
    return PomodoroTimer;
})();
// Set up our Pomodoro Timer
var pomOptions = {
    clock: $('.pomodoro-timer'),
    progressDisplay: $('#pomodoro-progress'),
    sound: createjs.Sound
};
var myClock = new PomodoroTimer(pomOptions);
// Set up our user interface
$(document).ready(function () {
    $('#start-stop').on('click', function () {
        if (myClock.running) {
            myClock.stop();
            $(this).html("Start");
        }
        else {
            myClock.start();
            $(this).html("Stop");
        }
    });
    // Set up reset button
    $('#reset').on('click', function () {
        myClock.reset();
        $('#start-stop').html("Start");
    });
    // Set up our option controls
    // First, set the minutes per pomodoro control up
    var timeSetting = $('#pomodoro_minutes');
    timeSetting.change(function () {
        myClock.setPomodoroTime($(this).val() * 60);
    });
    // Set the minutes per break control up
    var breakTime = $('#break_minutes');
    breakTime.change(function () {
        myClock.setBreakTime($(this).val() * 60);
    });
    // And now the control to set the total number of pomodoros that are desired
    var pomodoroCount = $('#pomodoros');
    pomodoroCount.change(function () {
        myClock.setPomodoros($(this).val());
    });
});