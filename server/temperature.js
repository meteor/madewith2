Meteor.startup(function(){
	//this determines the rank order of apps on the front page
	// votes add a point when they are added, but points decay over time
	// var scoreInterval = getSetting("scoreUpdateInterval") || 30;

	updateFrequency = 5000; //set to something larger later
	function foo(){
		console.log('tick');
	}
	var timer = setInterval(foo,updateFrequency);
	//var timerId = setInterval(console.log('tick'), updateFrequency);
});