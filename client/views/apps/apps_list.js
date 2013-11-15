
Template.appsList.helpers({
  apps: function() {
    return Apps.find({}, {sort: this.sort, limit: this.handle.limit()});
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
    return {
      sort: {submitted: -1},
      handle: newAppsHandle
    }
  }
});

// the frontpage list
Template.popularApps.helpers({
  options: function(){
    return {
      sort: {score: -1, submitted: -1},
      handle: popularAppsHandle
    }
  }
});