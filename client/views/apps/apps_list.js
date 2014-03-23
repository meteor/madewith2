
Template.appsList.helpers({
  apps: function() {
    if (Session.equals('myPkg','')) {
      return Apps.find({}, {sort: this.sort, limit: this.handle.limit()});
    } else{
      return Apps.find({'pkgs':Session.get('myPkg')}, {sort: this.sort, limit: this.handle.limit()});
    };
  },
  appsReady: function(){
  	return this.handle.ready();
  },
  allAppsLoaded: function() {
  	return this.handle.ready() && Apps.find().count() < this.handle.loaded();
  } 
});

//pagination
Template.appsList.events({
	'click .load-more': function(e) {
		e.preventDefault();
		this.handle.loadNextPage();
	}
});

// the /newest page list
Template.newApps.helpers({
  options: function(){
    Session.set('navPop','newest');
    return {
      sort: {submitted: -1},
      handle: newAppsHandle
    }
  }
});

// the frontpage list
Template.popularApps.helpers({
  options: function(){
    Session.set('navPop','home');
    return {
      sort: {score: -1, submitted: -1},
      handle: popularAppsHandle
    }
  }
});

// the /pkg page list
Template.appsByPkg.helpers({
  options: function(){
    var mypkg = Session.get('myPkg');
    myHandle = Session.equals('navPop','home') ? popularAppsHandle : newAppsHandle;
    return {
      pkgs: mypkg,
      handle: myHandle
    }
  }
});

Template.appsByPkg.events({
  'click #myfilter': function(e) {
    e.preventDefault();
    var mypkg = $('#filterpkg').val();
    Session.set('myPkg',mypkg);
    // console.log(Session.get('myPkg'));
  }
});


