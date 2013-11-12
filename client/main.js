Meteor.subscribe('apps');

/*Router.configure({
  layoutTemplate: 'content'
});*/

Router.map(function () {

  this.route('home', {
    path: '/', // match the root path
    //template: 'appsList'
  });

  this.route('appPage', {
    path: '/apps/:_id', // path with id of appPage
    load: function () { // called on first load
      Session.set('currentAppId', this.params._id); 
    },
  });

});
