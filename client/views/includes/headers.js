Template.topbar.helpers({
	//this changes the color of the topbar segment corresponding
	//to the page you're on
  activeRouteClass: function(/* route names */) {

    var args = Array.prototype.slice.call(arguments, 0);
    args.pop();
    
    var active = _.any(args, function(name) {
      return Session.get('navPop') === name;
      //var current = Router.current(); 
      //return current ? current.route.name === name : false;
    });
    
    return active && 'active';
  }
});

Template.topbar.events({
  'click .share-app': function () {
    Session.set('navPop','appSubmit');
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

//searching for a package
Template.pkgsearch.events({
  'click #myfilter': function(e) {
    e.preventDefault();
    searchForPkg($('#filterpkg').val());
  },
  'keypress #filterpkg': function (e, template) { //hitting enter works too
      if (e.which === 13) {
      searchForPkg($('#filterpkg').val());
    }
  }
});


//search for a package and go to its listing url
function searchForPkg(mypkg) {
  Session.set('myPkg',mypkg);
  Session.set('navPop','pkgPage');
  Router.go('pkgPage', {pkgname: mypkg});
}
