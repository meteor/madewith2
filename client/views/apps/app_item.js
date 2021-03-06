Template.appItemshort.helpers({
  sourceClass: function(){return getsourceClass(this.source);},
  hasDescript: function(){ //is there a description?
    return this.description != undefined;
  }
});

Template.appItem.helpers({
  sourceClass: function(){return getsourceClass(this.source);},
  hasDescript: function(){ //is there a description?
    return this.description != undefined;
  },
  hasPkgs: function() {
    return thingExists(this.pkgs);
  },
  getMyPkgs: function(){
    return this.pkgs.join(', ');
    // 'https://atmosphere.meteor.com/package/blaze-layout'
  }
});

Template.appTitleLine.helpers({
  domain: function() {return getDomain(this);},
});

Template.upvoteButton.helpers({
  upvotedClass: function() {
    // return 'upvote';
    return getUpvotedClass(Meteor.userId(), this);
  }
})

function getUpvotedClass(userId, self){
    if (!_.include(self.upvoters, userId)) {
      return 'upvote';
    } else {
      return 'upvote disabled';
    }
}

//change color if sourcecode is included
function getsourceClass(source){
  if (thingExists(source)) {
    return 'hilight';
  } else{ return ''; };
}

thingExists = function(myField){
  return (myField === undefined || myField === null) ? false : (myField.length != 0);
}

Template.appDetailsLine.helpers({
  ownApp: function() {
    return this.userId === Meteor.userId();
  },
  hasSource: function() {
    return thingExists(this.source);
  },
  commentLinkText: function(){
    var commentsCount = this.commentsCount;
    if (commentsCount === 0) { //if no comments, link is 'Discuss'
      return 'Discuss';
    } else{ // # Comments if nonzero comments
      var commentNoun = commentsCount.toString() + ' Comment' + pluralize(commentsCount);
      return commentNoun;
    };
  },
  pathContext: function () {
    return {urlname: toUrlName(this.url)};
  },
  baseDate: function(){
    return new Date(this.submitted);
  },
  voteText: function(){
    return 'vote' + pluralize (this.votes);
  },
  appID: function(){return this._id;},
  debugmode: function(){return false;}, //set to true if debugging 
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

