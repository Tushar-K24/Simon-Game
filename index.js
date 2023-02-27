const colors = ["green", "red", "yellow", "blue"];
let randomSequence = [];
var currentLevel = 0;
var currentBlock = 0; //index of the block to be checked

$(".block").on("click", function(){
    var color = this.id;
    animatePress(color);
    console.log(color);
    if(checkAnswer(color)){
        if(currentBlock === randomSequence.length){
            currentBlock = 0;
            setTimeout(nextSequence, 1000);
        }
    }
    else{
        currentLevel = 0;
        randomSequence = [];
        $("#heading").text("Oops! Wrong Answer");
    }
    
});

$(document).on("keypress", function(){
    if(currentLevel === 0){
        nextSequence();
    }
});

function animatePress(color){
    $("#" + color).toggleClass("highlight");
    setTimeout(function(){
        $("#" + color).toggleClass("highlight");    
    }, 100);
    playSound(color);
}

function checkAnswer(color){
    if(color === randomSequence[currentBlock]){
        currentBlock++;
        return true;
    }
    return false;
}

function generateRandomColor(){
    var index = Math.floor(Math.random()*4);
    return colors[index];
}

function nextSequence(){
    currentLevel++;
    $("#heading").text("Level " + currentLevel);

    var color = generateRandomColor();
    randomSequence.push(color);
    $("#" + color).fadeIn(100).fadeOut(100).fadeIn(100);
}

function playSound(color){
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}
