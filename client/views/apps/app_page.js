Template.appPage.helpers({
  currentApp: function() {
    return Apps.findOne(Session.get('currentAppId'));
  },
  comments: function() { //return getComments(Comments, this);
  	return Comments.find({appId: this._id});

  },
  app: function(){
  	return Apps.findOne(this.comments); //might not be right
  }
});

function getComments(Comments, self){
	Comments.find({appId: self._id});
}

Template.commentception.helpers({
  isParent: function(){
    //
  },
  childComment: function(){
    //
  }
});