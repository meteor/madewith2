Template.appPage.helpers({
  currentApp: function() {
    return Apps.findOne(Session.get('currentAppId'));
  },
  comments: function() { 
  	return Comments.find({appId: this._id});
  },
  app: function(){
  	return Apps.findOne(this.comments); //might not be right
  },
  rootComments: function() { 
    return Comments.find({appId: this._id, parentComment: null});//and isroot
  },
});

function getComments(Comments, self){
	Comments.find({appId: self._id});
}

Template.commentception.helpers({
  isParent: function(){  //do I have nonzero children?
    //note: this._id is the parent comment's id, not the appId
    return (!_.isEmpty(Comments.findOne({_id: this._id}).children));
  },
  childComment: function(){ //returns Comments.find( all the child comments )
    return Comments.find({parentComment: this._id});
  },
  rootComments: function() { 
    return Comments.find({appId: this._id, parentComment: null});//and isroot
  },
});
