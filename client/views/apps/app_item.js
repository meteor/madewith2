Template.appItemshort.helpers({
  domain: function() {return getDomain(this);},
  sourceClass: function(){return getsourceClass(this.source);},
});

Template.appItem.helpers({
  domain: function() {return getDomain(this);},
  sourceClass: function(){return getsourceClass(this.source);},
  hasDescript: function(){ //is there a description?
    return this.description != undefined;
  }
});

//TODO:
//set conditional on global bool "verbose," which the router sets 
//to false at home, and becomes true elsewhere
//this will then combine appItem and appItemshort

Template.upvoteButton.helpers({
  upvotedClass: function() {
    return getUpvotedClass(Meteor.userId(), this);
  }
})

function getUpvotedClass(userId, self){
    if (userId && !_.include(self.upvoters, userId)) {
      return 'upvote';
    } else {
      return 'upvote disabled';
    }
}

//change color if sourcecode is included
function getsourceClass(source){
  if (source != undefined) {
    return 'hilight';
  } else{ return ''; };
}

Template.appDetailsLine.helpers({
  ownApp: function() {
    return this.userId == Meteor.userId();
  },
  hasSource: function() {return this.source;},
  //todo: change hasSource to checking for field existing
  commentLinkText: function(){
    commentsCount = this.commentsCount;
    if (commentsCount === 0) { //if no comments, link is 'Discuss'
      return 'Discuss';
    } else{ // # Comments if nonzero comments
      var commentNoun = commentsCount.toString() + ' Comment' + pluralize(commentsCount);
      return commentNoun;
    };
  },
  baseDate: function(){
    return new Date(this.submitted);
  },
  voteText: function(){
    return 'vote' + pluralize (this.votes);
  },
  appID: function(){return this._id;},
  debugmode: function(){return false;}, //set to true if debugging 
  packages: function(){
    console.log(this.packages);
    return this.packages.join(', ');
  },
});

Template.appItem.events({
  'click .upvote': function(e){doUpvote(e, this);}
});

Template.appItemshort.events({
  'click .upvote': function(e){
    e.preventDefault();
    Meteor.call('upvote', this._id);
  }
});



function doUpvote(e, self){
  e.preventDefault();
  Meteor.call('upvote',self._id);
}

function getDomain(self){
  var a = document.createElement('a');
  a.href = self.url;
  return a.hostname;
}

//returns 's' if >1, '' otherwise
function pluralize(count) {//concise version
  if (count != 1)
    return 's';
  return '';
}

