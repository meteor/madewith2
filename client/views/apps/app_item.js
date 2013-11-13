Template.appItem.helpers({
  ownApp: function() {
    return this.userId == Meteor.userId();
  },
  commentsCount: function(){
    return getCommentsCount(this);
  }
});

Template.appTitleLine.helpers({
  domain: function() {
    var a = document.createElement('a');
    a.href = this.url;
    return a.hostname;
  }
});

Template.appDetailsLine.helpers({
  commentLinkText: function(){
    commentsCount = getCommentsCount(this)
    if (commentsCount === 0) { //if no comments, link is 'Discuss'
      return 'Discuss';
    } else{ 
      // # Comments if nonzero comments
      var commentNoun = commentsCount.toString();
      commentNoun += ' Comment' + pluralize(commentsCount);
      return commentNoun;
    };
  }
});

function getCommentsCount(self){
    return Comments.find({appId: self._id}).count();
}

//returns 's' if >1, '' otherwise
// function pluralize(count) { //proper version
//   if (count <= 1) {
//     return '';
//   } else{
//     return 's';
//   };
// }

function pluralize(count) {//concise version
  if (count > 1)
    return 's';
  return '';
}


/*Template.appsList.helpers({
  apps: function() {
    return Apps.find();
  }
});*/