Meteor.subscribe('apps');


Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function () {

  //the home page is the front page; with trending apps
  this.route('home', {
    path: '/', // match the root path
    template: 'appsList'
  });

  //discussion pages for each app
  this.route('appPage', {
    path: '/apps/:_id', // path with id of appPage
    load: function () { // called on first load
      Session.set('currentAppId', this.params._id); 
    },
  });

  //app submission
  this.route('appSubmit', {
    path: '/submit', 
  });

});
