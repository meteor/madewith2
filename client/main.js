
// subscriptions to Apps collection
newAppsHandle = Meteor.subscribeWithPagination('newApps',14);
popularAppsHandle = Meteor.subscribeWithPagination('popularApps',14);

Deps.autorun(function(){
  var hostname = Session.get('currentAppHostname');
  if (hostname) {
    Meteor.subscribe('singleApp', hostname);
    Meteor.subscribe('comments', hostname);
  }
});

///////////////////Iron-Router///////////////////
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
    path: '/apps/:hostname',
    data: function() { return appByHostname(this.params.hostname); },
    load: function () { // called on first load
      Session.set('currentAppHostname', this.params.hostname);
    },
    waitOn: function() {
      return [
        Meteor.subscribe('singleApp', this.params.hostname),
        Meteor.subscribe('comments', this.params.hostname)
      ];
    }
  });

  this.route('badgePage', {
    path: '/badge/:hostname',
    data: function() { return appByHostname(this.params.hostname); },
    load: function () { // called on first load
      Session.set('currentAppHostname', this.params.hostname);
    },
    layoutTemplate: null,
    waitOn: function() {
      return [
        Meteor.subscribe('singleApp', this.params.hostname)
      ];
    }
  });

  // editing each app
  this.route('appEdit', {
    path: '/apps/:hostname/edit', // path with id of appPage
    load: function () { // called on first load
      Session.set('currentAppHostname', this.params.hostname);
    },
  });


  //app submission
  this.route('appSubmit', {
    path: '/submit', 

    // before: function() { // before rendering, check if user logged in
    //   var user = Meteor.user();
    //     if (! user) {
    //         Meteor.loginWithGithub(function (err) {
    //           if (!err)

    //             // Meteor.call('upvote', self._id);
    //         });
    //     }
    //     this.render(Meteor.loggingIn() ? this.loadingTemplate : 'login');
    //     this.render('accessDenied');
    //     return this.stop();   
    //   }
    // }
  });
});

