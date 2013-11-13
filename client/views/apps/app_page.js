Template.appPage.helpers({
  currentApp: function() {
    return Apps.findOne(Session.get('currentAppId'));
  },
  comments: function() {
  	return Comments.find({appId: this._id});
  }
});