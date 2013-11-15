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
  isParent: function(){  //do I have nonzero children?
    console.log(Comments.findOne({_id: this._id}));
    if (Comments.findOne({_id: this._id}) === undefined) {
      return false;
    } else{
      myChildren = Comments.findOne({_id: this._id}).children;
        if (!_.isEmpty(myChildren))
          return true;
        if (myChildren === undefined)
          return false;
    };



    // if (Comments.findOne({_id: this._id}) === undefined)
    //   return false;
    // myChildren = Comments.findOne({_id: this._id}).children;
    // if (!_.isEmpty(myChildren))
    //   return true;
    // //console.log(!_.isEmpty(Comments.findOne({_id: this._id}).children));
    // myChildren = Comments.findOne({_id: this._id}).children;
  },
  childComment: function(){ //returns Comments.find( all the child comments )
    console.log(this._id);
    return Comments.findOne({parentComment: this._id});
  }
});