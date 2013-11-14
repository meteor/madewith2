Meteor.publish('apps', function(limit) {
  	return Apps.find({}, {sort: {submitted: -1}, limit:limit});
});

Meteor.publish('comments', function(appId){
	return Comments.find({appId: appId});
});