// Template.appItem.helpers({
//   commentsCount: function(){
//     return getCommentsCount(this);
//   }
// });

// Template.appItemshort.helpers({
//   commentsCount: function(){
//     thisapp = Apps.find({appId: self._id});
//     return thisapp.commentsCount;
//   }
// });

Template.appTitleLine.helpers({
  domain: function() {
    var a = document.createElement('a');
    a.href = this.url;
    return a.hostname;
  }
});

Template.appDetailsLine.helpers({
  ownApp: function() {
    return this.userId == Meteor.userId();
  },
  hasSource: function() {
    return this.source;
  },
  commentLinkText: function(){
    // commentsCount = Apps.find({appId: self._id}).commentsCount;
    commentsCount = this.commentsCount;
    //commentsCount = getCommentsCount(this);
    if (commentsCount === 0) { //if no comments, link is 'Discuss'
      return 'Discuss';
    } else{ 
      // # Comments if nonzero comments
      var commentNoun = commentsCount.toString() + ' Comment' + pluralize(commentsCount);
      return commentNoun;
    };
  }
});

// function getCommentsCount(self){
//     //commentsCount = this.commentsCount;
//     return Comments.find({appId: self._id}).count();
// }

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