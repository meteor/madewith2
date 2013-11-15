Template.appPage.helpers({
  currentApp: function() {
    return Apps.findOne(Session.get('currentAppId'));
  },
  comments: function() { //return getComments(Comments, this);
  	return Comments.find({appId: this._id});

  },
  app: function(){
  	return Apps.findOne(this.comments); //might not be right
  },
  rootComments: function() { //return getComments(Comments, this);
    //console.log(Comments.find({appId: this._id, parentComment: null}));
    return Comments.find({appId: this._id, parentComment: null});//and isroot
  },
});

function getComments(Comments, self){
	Comments.find({appId: self._id});
}

Template.commentception.helpers({
  isParent: function(){  //do I have nonzero children?
    //console.log(Comments.findOne({_id: this._id}));
      myChildren = Comments.findOne({_id: this._id}).children;
        if (!_.isEmpty(myChildren))
          return true;
        return false;
  },
  childComment: function(){ //returns Comments.find( all the child comments )
    console.log('asdf;lkj;')
    console.log(this._id);
    return Comments.find({parentComment: this._id});
  },
  rootComments: function() { //return getComments(Comments, this);
    //console.log(Comments.find({appId: this._id, parentComment: null}));
    return Comments.find({appId: this._id, parentComment: null});//and isroot
  },
});

    //console.log(this._id);
    //console.log(Comments.find({appId: this._id}));