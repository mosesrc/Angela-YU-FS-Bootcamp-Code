var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ['red', 'blue', 'green', 'yellow'];
var level = 0;
var started = false;

$('div[type=button]').click(function () {
    var userChosenColour = $(this).attr('id');
    $(`#${userChosenColour}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(userChosenColour);
    userClickedPattern.push(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

$(document).keypress(function () {
    if (!started) {
        $('h1').text(`Level ${level}`);
        nextSequence();
        started = true;
    }
});

function nextSequence() {
    level++;
    $('h1').text(`Level ${level}`);
    
    var randNum = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randNum];

    gamePattern.push(randomChosenColour);
    $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name) {
    var audio = new Audio(`./sounds/${name}.mp3`);
    audio.play()
}

function animatePress(currentColour) {
    $(`#${currentColour}`).addClass('pressed');

    setTimeout(() => {
        $(`#${currentColour}`).removeClass('pressed');
    }, 100)
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[gamePattern.length - 1]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }

    } else {
        console.log('wrong');
        var audio = new Audio('sounds/wrong.mp3');
        audio.play();

        $('body').addClass('game-over');

        setTimeout(() => {
            $('body').removeClass('game-over');
        }, 200)

        $('h1').text('Game Over, Press Any Key to Restart');
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = []
    started = false;
}