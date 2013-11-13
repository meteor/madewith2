Meteor.publish('apps', function() {
  return Apps.find();
});

Meteor.publish('comments', function(){
	return Comments.find();
});