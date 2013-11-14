Meteor.startup(function(){
	//this determines the rank order of apps on the front page
	// votes add a point when they are added, but points decay over time
	// var scoreInterval = getSetting("scoreUpdateInterval") || 30;

	var updateFrequency = 5000; //set to something larger later
	var decay_factor = 0.90; // every update, temperature decays this much

	function foo(){
		console.log('tick');
		//take previous score and * it by decay_factor
		//add new votes to score
	}

	var timer = setInterval(foo,updateFrequency);
	//var timerId = setInterval(console.log('tick'), updateFrequency);
});