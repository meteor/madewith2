
// subscriptions to Apps collection
newAppsHandle = Meteor.subscribeWithPagination('newApps',14);
popularAppsHandle = Meteor.subscribeWithPagination('popularApps',14);

// subscriptions to Comments collection
Meteor.subscribe('comments');

Deps.autorun(function(){
  Meteor.subscribe('singleApp', Session.get('currentAppId'))
  Meteor.subscribe('comments', Session.get('currentAppId'));
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
    path: '/apps/:domain',
    data: function() { return appByDomain(this.params.domain); },
    load: function () { // called on first load
      var app = appByDomain(this.params.domain);
      Session.set('currentAppId', app._id); 
    },
    waitOn: function() {
      var app = appByDomain(this.params.domain);
      return [
        Meteor.subscribe('singleApp', app._id),
        Meteor.subscribe('comments', app._id)
      ];
    }
  });

  this.route('badgePage', {
    path: '/badge/:domain',
    data: function() { return appByDomain(this.params.domain) },
    load: function () { // called on first load
      var app = appByDomain(this.params.domain);
      Session.set('currentAppId', app._id); 
    },
    layoutTemplate: null,
    waitOn: function() {
      var app = appByDomain(this.params.domain);
      return [
        Meteor.subscribe('singleApp', app._id)
      ];
    }
  });

  // editing each app
  this.route('appEdit', {
    path: '/apps/:domain/edit', // path with id of appPage
    load: function () { // called on first load
      var app = appByDomain(this.params.domain);
      Session.set('currentAppId', app._id); 
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

