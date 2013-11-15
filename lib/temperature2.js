//temperature2, a model of vote decay

var updateFrequency = 10000; // every 10 s, scores will decay
var decay_factor = 0.9999999; // by this much 

function updateAllTheThings(){
	console.log('updated');
	
	  //take previous score and * it by decay_factor
	update_decay();

};

function update_decay(){
  Apps.find({}).forEach(function (app) { 
    Apps.update(app._id, {
      $set: {score: app.score*decay_factor}
    })
  });
}

var timer = Meteor.setInterval(updateAllTheThings,updateFrequency);

// utilities for testing:

//resets all votes, scores, and voter lists to 0 or [];
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

function zeroTheNonExistentScores(){
  Apps.find({score: {$exists: false}}).forEach(function (app) { 
    Apps.update(app._id, {
      $set: {score: 0}
    });
  });
} 



