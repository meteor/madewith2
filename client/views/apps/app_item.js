Template.appItem.helpers({
  ownApp: function() {
    return this.userId == Meteor.userId();
  },
  domain: function() {
    var a = document.createElement('a');
    a.href = this.url;
    return a.hostname;
  },
  commentsCount: function(){
    return getCommentsCount(this);
  },
  commentLinkText: function(){
    commentsCount = getCommentsCount(this)
    if (commentsCount === 0) { //if no comments, link is 'Discuss'
      return 'Discuss';
    } else{ 
      // # Comments if more than 0 comments
      var nComments = commentsCount.toString();
      return nComments.concat(' Comments');
    };
  }
});

function getCommentsCount(self){
    return Comments.find({appId: self._id}).count();
}

/*Template.appsList.helpers({
  apps: function() {
    return Apps.find();
  }
});*/