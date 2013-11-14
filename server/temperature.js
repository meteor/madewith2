
/////////////////////////////////////////////////////////////////////////////////
// The value of a vote grows exponentially over time, that is, future votes are//
// worth more than present votes. Time since launch is computed, and used to   //
// compute the present value of a vote, which is the score that gets added to a//
// post to determine its rank on the front page.                               //
/////////////////////////////////////////////////////////////////////////////////

var updateFrequency = 9000;
var r = 0.0000001; //growth rate of the value of a vote
var _currentVoteValue = 0;
var _currentVoteValueListeners = new Deps.Dependency();

launchTime = function(){
	launchTime = new Date().getTime(); //fix to one launch date later
	console.log('App Launched at ');
	console.log(launchTime);
	//Apps.update({},{$set: {score: 0}});
};

currentVoteValue = function() {
  _currentVoteValueListeners.depend();
  return _currentVoteValue;
}

getCurrentVoteValue = function (){
	now = new Date().getTime();
	t = now - launchTime;
	console.log(t);
	return Math.exp(r*t);
}

launchTime();
Meteor.setInterval(function() {
	votevalue = getCurrentVoteValue();
	console.log(votevalue);
	if (votevalue !== _currentVoteValue) {
		_currentVoteValue = votevalue;
		_currentVoteValueListeners.changed();
	}
}, updateFrequency);

