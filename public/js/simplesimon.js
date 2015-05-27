"use strict";

var round = 1;
var sequence = [];
var guess = [];
var n = 0;
var checkCounter;
var buttonSound;
var gameover = document.getElementById("game-over");
var wrong = document.getElementById("wrong");
var score = 0;


function getRandomInt(min, max) {
	return Math.floor(Math.random()*(max - min))+min;
}
//start game function, start over function
function startOver() {
	guess = [];
	sequence = [];
	round = 1;
	$("#btn-start").css("display","inline");
	alert("Play Again?");
}
//bonus points!
function bonus() {

}

// set guess array back to empty for each round, 
// set n back to 0 so sequence will play from the begging each time in playSequence
// update round and instruction display
// add a new random number to the sequence, then pass it to the function that animates it
function setSequence() {
	guess = [];
	n = 0;
	$("#round").html(round);
	$("#inner-circle").html("Watch.");
	sequence.push(getRandomInt(1,5));
	playSequence(sequence);
}
//loop through, animating each box for as many numbers as are in the sequence using n as a counter
function playSequence(array) {
	setTimeout(function(){
		$("#" + array[n])
			.animate ({opacity: 1},400)
			.animate ({opacity: .5},400);
		buttonSound = document.getElementById("sound" + array[n]);
		buttonSound.play();

		if (n == (array.length - 1)) {
			$("#inner-circle").html("Repeat.");
			console.log("the new sequence is "+sequence);
		} else {
			n++;
			playSequence(array);
		}
	},800);
}
//for loop that iterates through all boxes
for (var i = 0; i<=4; i++) {
	//highlight buttons when clicked
	$("#" + i)
		.mouseup(function(){	
			$(this).css("opacity",".5");
		})
		.mousedown(function(){
			$(this).css("opacity","1");
		});

	//add click event to check the user's guess of that button against the sequence
	$("#" + i).click(function(){
		checkCounter = 0;
		console.log("----------clicked " + $(this).attr("id") + "-----------");
		guess.push($(this).attr("id"));
		console.log("guess = " + guess);
		console.log("sequence = " + sequence);
		for (var j = 0; j < guess.length; j++) {
			console.log("does " + guess[j] + " equal " + sequence[j] + "?");
			if (guess[j] != sequence[j]) {
				console.log("No!");
				wrong.play();
				gameover.play();
				startOver();
			} else {
				//play sound for buttons when clicked
				buttonSound = document.getElementById("sound" + $(this).attr("id"));
				buttonSound.play();
				console.log("I believe so!");
				checkCounter++;
				if (checkCounter == sequence.length) {
					round++;
					score++;
					if (score % 5 == 0) {
						score += 5;
						bonus();
					}
					$("#score").html(score);
					setSequence();
				}
			}
		}
	});
}
//add event listener to start button, to begin game play
$("#inner-circle").click(function() {
	setSequence();
	$(this).css("background-color","#000");
	$(this).html("Watch.");
});
