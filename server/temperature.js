
//this determines the rank order of apps on the front page
// votes add a point when they are added, but points decay over time
// var scoreInterval = getSetting("scoreUpdateInterval") || 30;

updateFrequency = 9000; //set to something larger later
decay_factor = 0.90; // every update, temperature decays this much

function bar(){
	console.log('tock');
	//Apps.update({},{$set: {score: 0}});
};

Meteor.setTimeout(bar,updateFrequency);

function updateAllTheThings(){
		//testing
	console.log('tick');
	console.log(Apps.find({score: NaN}).count());

		//set all apps with NaN votes to 0
	//Apps.update({score: NaN},{$set: {score: 0}});
	zeroTheNaNs();
		//take previous score and * it by decay_factor
	update_decay();
		//add new votes to score; new votes are newly registered since last interval
	addNewVotes();
		//update votecache for next update
	Apps.update({},{$set: {votecache: Apps.votes}});
};

function zeroTheNaNs(){
	Apps.find({score: NaN}).forEach(function (app) { 
		Apps.update(app._id, {
			$set: {score: 1}
		})
	});
}

function addNewVotes(){
	Apps.find({}).forEach(function (app) { 
		Apps.update(app._id, {
			$set: {score: Apps.score + (Apps.votes - Apps.votecache)}
		})
	});
}
function update_decay(){
	Apps.find({}).forEach(function (app) { 
		Apps.update(app._id, {
			$set: {score: Apps.score*decay_factor}
		})
	});
}


var timer = Meteor.setInterval(updateAllTheThings,updateFrequency);
//var timerId = setInterval(console.log('tick'), updateFrequency);
