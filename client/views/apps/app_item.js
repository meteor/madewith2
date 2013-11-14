
//is there a wayto put combine this?

Template.appItemshort.helpers({
  domain: function() {
    return getDomain(this);
  }
});

Template.appItem.helpers({
  domain: function() {
    return getDomain(this);
  },
  hasDescript: function(){
    return this.description != undefined;
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

function getDomain(self){
  var a = document.createElement('a');
  a.href = self.url;
  return a.hostname;
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

