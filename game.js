buttonColors = ["red", "blue", "green", "yellow"];
gamePattern = [];
userClickedPattern= [];
var started = false;
var level = 0;

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
    $("." + randomChosenColour).fadeOut().fadeIn();
    userClickedPattern = [];
    level += 1;
    $("h1").text("Level " + level);
};

function playSound (name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
};

function animatePress (currentColour) {
    $("." + currentColour).addClass("pressed");
    
    setTimeout(function (){
        $("." + currentColour).removeClass("pressed");
    }, "100");
};

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");

        // Check if the user completed the sequence
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 1000);
        }
    } else {
        console.log("wrong");
        var wrongAudio = new Audio("./sounds/wrong.mp3");
        wrongAudio.play();
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        startOver(); // Restart the game only if the user is wrong
    }
}



function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}


$(document).keydown(function() {
    if (!started) {
        level = 0;
        started = true;
        gamePattern = [];
        userClickedPattern = [];
        nextSequence();
    }
})


$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");  // Get the id/name of the color
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
    
    }
)

