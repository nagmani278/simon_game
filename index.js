var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var flag = 0;
var level = 0;
var count = 0;

function nextSequence(){
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour =buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  $("h1").text("Level "+level);
  level++;
}

function playSound(name){
  var sound = new Audio("sounds/"+name+".mp3");
  sound.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function (){
    $("#"+currentColour).removeClass("pressed");
  },100);
}

function checkAnswer(currentLevel){
  var bool = true;
  for(var i=currentLevel-1;i>=0;i--){
    if(gamePattern[i]!==userClickedPattern[i]){
      bool = false;
      break;
    }
  }
  return bool;
}

function gameOver(){
  level = 0;
  flag = 0;
  count = 0;
  gamePattern = [];
  userClickedPattern = [];
  $("h1").text("Game Over. Press Button to start");
  $("body").addClass("game-over");
  setTimeout(function (){
    $("body").removeClass("game-over");
  },200);
  playSound("wrong");
 }

$(".btn").click(function (event){
  if(flag===1){
    count++;
    var userChosenColour = $(event.target).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    if(count === level){
      var answer = checkAnswer(level);
      if(answer){
        userClickedPattern = [];
        count = 0;
        nextSequence();
      }
      else{
        gameOver();
      }
    }
  }
});

$("#start").click(function (){
  if(flag===0){
    nextSequence();
    flag = 1;
  }
});
