var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ['red', 'blue', 'green', 'yellow'];

$('div[type=button]').click(function () {
    var userChosenColour = $(this).attr('id');
    playSound(userChosenColour);
    userClickedPattern.push(userChosenColour);
});

function nextSequence() {
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