Meteor.publish('apps', function() {
  return Apps.find();
});

Meteor.publish('comments', function(appId){
	return Comments.find({appId: appId});
});