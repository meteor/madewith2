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