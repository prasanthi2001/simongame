let buttonColors = ["green", "red", "yellow", "blue"];
let gamePattern = [];
let userClickedPattern = [];

let level = 0;
let started = false;

$(document).keydown(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });

$(".btn").click(function(){
    let userChosenColor = $(this).attr('id');

    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    playSound(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
});

function nextSequence() {
    userClickedPattern = [];
    level++;

    $("#level-title").text("Level " + level);

    let randomNumber = Math.floor(Math.random()*4); 
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor); 

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function playSound(name) {
        let audio = new Audio("sounds/" + name + ".mp3");
        audio.play();
}

function animatePress(currentColor) {
    $("#"+currentColor).addClass("pressed");  
    setTimeout(()=>{
        $("#"+currentColor).toggleClass("pressed");
    }, 100);  
}

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
        
        if(gamePattern.length == userClickedPattern.length) {
            setTimeout(function() {nextSequence();}, 1000);
        }
    } else {
        playSound("wrong");

        $("body").addClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart");

        setTimeout(function(){$("body").toggleClass("game-over");}, 200);

        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
}