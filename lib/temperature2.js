//temperature2

var updateFrequency = 50000; //set to something larger later
var decay_factor = 0.9999999; // every update, temperature decays this 

function updateAllTheThings(){
	  //testing
	console.log('tick');
	//console.log(Apps.find({score: NaN}).count());

		//reset all votes
	// resetAllVotes();
	  //set all apps with NaN votes to 0
	// zeroThe(NaN);
	// zeroThe(null);
	// zeroThevotecache(NaN);
	// zeroThevotecache(null);
	// zeroTheNonExistentScores();
	// zeroTheNonExistentVoteCache();
	  //take previous score and * it by decay_factor
	update_decay();
	  //add new votes to score; new votes are newly registered since last interval
//	addNewVotes(); // just have score update when upvoting, save this step
	  //update votecache for next update
//	Apps.update({},{$set: {votecache: Apps.votes}}, {multi: true});
};

//var timer = Meteor.setInterval(updateAllTheThings,updateFrequency);

function resetAllVotes(){
	Apps.find({}).forEach(function (app) { 
	    Apps.update(app._id, {
	      $set: {upvoters: []}
	    });
  	});
  	Apps.find({}).forEach(function (app) { 
	    Apps.update(app._id, {
	      $set: {score: 0},
	    });
  	});
  	Apps.find({}).forEach(function (app) { 
	    Apps.update(app._id, {
	      $set: {votes: 0},
	    });
  	});
}


function zeroThe(value){
  Apps.find({score: value}).forEach(function (app) { 
    Apps.update(app._id, {
      $set: {score: 0}
    });
  });
} 

function zeroThevotecache(value){
  Apps.find({votecache: value}).forEach(function (app) { 
    Apps.update(app._id, {
      $set: {votecache: 0}
    });
  });
} 

function zeroTheNonExistentScores(){
  Apps.find({score: {$exists: false}}).forEach(function (app) { 
    Apps.update(app._id, {
      $set: {score: 0}
    });
  });
} 
function zeroTheNonExistentVoteCache(){
  Apps.find({votecache: {$exists: false}}).forEach(function (app) { 
    Apps.update(app._id, {
      $set: {votecache: 0}
    });
  });
} 

function addNewVotes(){
  Apps.find({}).forEach(function (app) { 
    Apps.update(app._id, {
      $set: {score: app.score + (app.votes - app.votecache)}
    })
  });
}
function update_decay(){
  Apps.find({}).forEach(function (app) { 
    Apps.update(app._id, {
      $set: {score: app.score*decay_factor}
    })
  });
}

