appsHandle = Meteor.subscribeWithPagination('newApps',14);
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
    template: 'appsList'
  });

  // discussion pages for each app
  // this.route('appPage', {
  //   path: '/apps/:_id', // path with id of appPage
  //   load: function () { // called on first load
  //     Session.set('currentAppId', this.params._id); 
  //   },
  // });


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

  // // discussion pages for each app
  // this.route('err302Page', {
  //   path: '/apps/:_id', // path with id of appPage
  //   template: 'appPage',
  //   layoutTemplate: 'layout',
  //   yieldTemplates:{
  //     'errorTemplate': {to: 'errors'}
  //   },
  //   load: function () { // called on first load
  //     Session.set('currentAppId', this.params._id); 
  //   },
  //   //action: function(){
  //     //
  //   //}
  // });

  // editing each app
  this.route('appEdit', {
    path: '/apps/:_id/edit', // path with id of appPage
    load: function () { // called on first load
      Session.set('currentAppId', this.params._id); 
    },
  });


  // recently submitted apps
  //this.route('newApps', {
    //}
  //});

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

// var requireLogin = function() {
//   if (! Meteor.user()) {
//     if (Meteor.loggingIn())
//       this.render(this.loadingTemplate);
//     else
//       this.render('accessDenied');
    
//     this.stop();
//   }
// }

//Router.before(requireLogin, {only: 'appSubmit'})
//Router.before(function() { clearErrors() });
