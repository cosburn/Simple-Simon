"use strict";

var round = 5;
var sequence = [];
var n = 0;

function getRandomInt(min, max) {
	return Math.floor(Math.random()*(max - min))+min;
}
function highlight(n) {
	$("#" + n)
		.animate ({opacity: 1},1000)
		.animate ({opacity: .2},1000);
		console.log("running " + n);
}
function setSequence() {
	for (var i = 1; i <= round; i++) {
		sequence.push(getRandomInt(1,round));
	}
	console.log(sequence);
	playSequence(sequence);

	// sequence.forEach(function(element, index, array) {
	// 	console.log("forEach "+element)
	// 	setTimeout(function(){
	// 		highlight(element);
	// 	},3000);
			
	// });
}
function playSequence(array) {
	setTimeout(function(){
		$("#" + array[n])
			.animate ({opacity: 1},500)
			.animate ({opacity: .2},500);
		console.log("running " + array[n]);
		n++;
		if (n < array.length) {
			playSequence(array);
		}
	},1000);
}
