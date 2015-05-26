"use strict";

var round = 1;
var sequence = [];
var guess = [];
var n = 0;
var checkCounter;

function getRandomInt(min, max) {
	return Math.floor(Math.random()*(max - min))+min;
}
//set guess back to empty, iterator n back to 0 so sequence will start at the begging each time
//update the round and instruction display
//add a new random number to the sequence, then pass it to the function that animates it
function setSequence() {
	guess = [];
	n = 0;
	$("#round").html(round);
	$("#instruction").html("Watch the sequence.");
	sequence.push(getRandomInt(1,5));
	playSequence(sequence);
}
//loop through, animating each box for as many numbers as are in the sequence using n as a counter
function playSequence(array) {
	setTimeout(function(){
		$("#" + array[n])
			.animate ({opacity: 1},500)
			.animate ({opacity: .5},500);
		// console.log("running " + array[n]);
		if (n == (array.length - 1)) {
			$("#instruction").html("Repeat the sequence you just saw.");
			console.log("the new sequence is "+sequence);
		} else {
			n++;
			playSequence(array);
		}
	},1000);
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
			console.log("j = "+j);
			console.log("does " + guess[j] + " equal " + sequence[j] + "?");
			if (guess[j] != sequence[j]) {
				alert("WRONG");
				guess = [];
				sequence = [];
				$("#btn-start").css("display","inline");
			} else {
				console.log("I believe so!");
				checkCounter++;
				if (checkCounter == sequence.length) {
					round++;
					setSequence();
				}
			}
		}
	});
}
//add event listener to start button, to begin game play
$("#btn-start").click(function() {
	setSequence();
	$(this).css("display","none");
});
