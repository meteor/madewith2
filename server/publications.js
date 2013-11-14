Meteor.publish('newApps', function(limit) {
  	return Apps.find({}, {sort: {submitted: -1}, limit:limit});
});

Meteor.publish('popularApps', function(limit) {
  	return Apps.find({}, {sort: {score: -1, submitted: -1}, limit:limit});
});

Meteor.publish('singleApp', function(id){
	return id && Apps.find(id);
});

Meteor.publish('comments', function(appId){
	return Comments.find({appId: appId});
});



/////////////////////////////////////////////////////////////////////////////////
// The value of a vote grows exponentially over time, that is, future votes are//
// worth more than present votes. Time since launch is computed, and used to   //
// compute the present value of a vote, which is the score that gets added to a//
// post to determine its rank on the front page.                               //
/////////////////////////////////////////////////////////////////////////////////

var r = 0.0000001; //growth rate of the value of a vote

launchTime = new Date().getTime(); //fix to one launch date later
console.log('App Launched at ');
console.log(launchTime);

var getCurrentVoteValue = function (){
	now = new Date().getTime();
	t = now - launchTime;
	console.log(t);
	return Math.exp(r*t);
};

var updateFrequency = 9000;
Meteor.setInterval(function () {
	if (VoteValueCollection.find().count() === 0) {
		VoteValueCollection.insert(
			{value: getCurrentVoteValue()});
	} else {
		VoteValueCollection.update(
			{}, // update "all" documents (there is only one)
			{$set: {value: getCurrentVoteValue()}});
	}
}, updateFrequency);

Meteor.publish('voteValue', function(){
	return VoteValueCollection.find();
});
