Template.appPage.helpers({
  currentApp: function() {
    return appByUrlname(Session.get('currentAppUrlname'));
  },
  comments: function() { 
  	return Comments.find({appId: this._id},{sort: {votes: -1}});
  },
  rootComments: function() { 
    return Comments.find({appId: this._id, parentComment: null},{sort: {votes: -1}});//and isroot
  },
});

function getComments(Comments, self){
	Comments.find({appId: self._id});
}

Template.commentception.helpers({
  isParent: function(){  //do I have nonzero children?
    //note: this._id is the parent comment's id, not the appId
    if (Comments.findOne({_id: this._id}) === undefined) {
      return false; //if you can't find it, don't traverse it
    } else { // if it IS defined, do the usual thing
      return (!_.isEmpty(Comments.findOne({_id: this._id}).children)); 
    };
  },
  childComment: function(){ //returns Comments.find( all the child comments )
    return Comments.find({parentComment: this._id});
  },
  rootComments: function() { 
    return Comments.find({appId: this._id, parentComment: null});//and isroot
  },
});
