newAppsHandle = Meteor.subscribeWithPagination('newApps',14);
popularAppsHandle = Meteor.subscribeWithPagination('popularApps',14);
currentVoteValue = Meteor.subscribe('currentVoteValue');

Meteor.subscribe('comments');

Deps.autorun(function(){
  Meteor.subscribe('singleApp', Session.get('currentAppId'))
  Meteor.subscribe('comments', Session.get('currentAppId'));
});

Router.configure({
  layoutTemplate: 'layout',
});


Router.map(function () {

  // the home page is the front page; with trending apps
  this.route('home', {
    path: '/', // match the root path
    template: 'popularApps'
  });

  this.route('newest', {
    path: '/newest', // match the root path
    template: 'newApps'
  });

  this.route('appPage', {
    path: '/apps/:_id',
    data: function() { return Apps.findOne(this.params._id); },
    load: function () { // called on first load
      Session.set('currentAppId', this.params._id); 
    },
    waitOn: function() {
      return [
        Meteor.subscribe('singleApp', this.params._id),
        Meteor.subscribe('comments', this.params._id)
      ];
    }
  });

  // editing each app
  this.route('appEdit', {
    path: '/apps/:_id/edit', // path with id of appPage
    load: function () { // called on first load
      Session.set('currentAppId', this.params._id); 
    },
  });


  //app submission
  this.route('appSubmit', {
    path: '/submit', 

    before: function() { // before rendering, check if user logged in
      var user = Meteor.user();
      if (! user) {
        this.render(Meteor.loggingIn() ? this.loadingTemplate : 'login');
        //alert("Please log in.");
        this.render('accessDenied');
        return this.stop();   
      }
    }
  });
});

