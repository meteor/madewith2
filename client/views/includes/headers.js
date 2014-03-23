Template.topbar.helpers({
	//this changes the color of the topbar segment corresponding
	//to the page you're on
  activeRouteClass: function(/* route names */) {
    var args = Array.prototype.slice.call(arguments, 0);
    args.pop();
    
    var active = _.any(args, function(name) {
      var current = Router.current(); 
      return current ? current.route.name === name : false;
    });
    
    return active && 'active';
  }
});

Template.topbar.events({
  'click .share-app': function () {
    if (Meteor.user()) {
      Router.go('appSubmit');
    } else {
      Meteor.loginWithMeteorDeveloperAccount(function (err) {
        if (!err) {
          Router.go('appSubmit');
        }
      });
    }
  }
});
