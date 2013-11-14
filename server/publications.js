Meteor.publish('newApps', function(limit) {
  	return Apps.find({}, {sort: {submitted: -1}, limit:limit});
});
Meteor.publish('singleApp', function(id){
	return id && Apps.find(id);
});

Meteor.publish('comments', function(appId){
	return Comments.find({appId: appId});
});