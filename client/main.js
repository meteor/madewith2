
// subscriptions to Apps collection
newAppsHandle = Meteor.subscribeWithPagination('newApps',14);
popularAppsHandle = Meteor.subscribeWithPagination('popularApps',14);

Deps.autorun(function(){
  var urlname = Session.get('currentAppUrlname');
  if (urlname) {
    Meteor.subscribe('singleApp', urlname);
    Meteor.subscribe('comments', urlname);
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
    path: '/apps/:urlname',
    data: function() { return appByUrlname(this.params.urlname); },
    load: function () { // called on first load
      Session.set('currentAppUrlname', this.params.urlname);
    },
    waitOn: function() {
      return [
        Meteor.subscribe('singleApp', this.params.urlname),
        Meteor.subscribe('comments', this.params.urlname)
      ];
    }
  });

  this.route('badgePage', {
    path: '/badge/:urlname',
    data: function() { return appByUrlname(this.params.urlname); },
    load: function () { // called on first load
      Session.set('currentAppUrlname', this.params.urlname);
    },
    layoutTemplate: null,
    waitOn: function() {
      return [
        Meteor.subscribe('singleApp', this.params.urlname)
      ];
    }
  });

  // editing each app
  this.route('appEdit', {
    path: '/apps/:urlname/edit', // path with id of appPage
    load: function () { // called on first load
      Session.set('currentAppUrlname', this.params.urlname);
    }
  });


  //app submission
  this.route('appSubmit', {
    path: '/submit', 

    // before: function() { // before rendering, check if user logged in
    //   var user = Meteor.user();
    //     if (! user) {
    //         Meteor.loginWithMeteorDeveloperAccount(function (err) {
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

