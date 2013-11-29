Template.appItemshort.helpers({
  domain: function() {return getDomain(this);},
  sourceClass: function(){return getsourceClass(this.source);},
  currentVoteValue: function(){return realVoteValue();}
});

Template.appItem.helpers({
  domain: function() {return getDomain(this);},
  sourceClass: function(){return getsourceClass(this.source);},
  currentVoteValue: function(){return realVoteValue();},
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
  //set to true if debugging 
  debugmode: function(){return false;},
  packages: function(){
    var mySource  = this.source;
    var githubdomain = "github.com/";
    var prefix    = "https://api.github.com/repos/";
    var suffix    = "/contents/.meteor/packages";
    var n         = mySource.indexOf(githubdomain,0);
    var repoStart = n+githubdomain.length;
    var repoId    = mySource.substring(repoStart,mySource.length);
    var pSource   = prefix + repoId + suffix;
    var myPackages64 = '';
    // console.log(pSource);
    data = $.getJSON(pSource, function(data){
      // console.log(data);
      myPackages64 = data.content;
      // myPackages64.replace("\n","");
      // console.log(myPackages64);
      myPackages = atob(myPackages64.replace(/\n/g, ""));
      console.log(myPackages);
      return myPackages;
    });
    // console.log(data);
    // console.log('myPackages');
    // console.log(myPackages);
    // console.log(data.content);
    // var myPackages = atob(data.content);
    // console.log(myPackages);
    // var n = mySource.indexOf(githubdomain,0);
    // console.log(n);
    // var x = mySource.indexOf('/',n+githubdomain.length);
    // console.log(x);
    // mySource = 'https://github.com/sharett/balance';
    return pSource;
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

