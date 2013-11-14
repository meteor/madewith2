
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

Template.appsList.events({
	'click .load-more': function(e) {
		e.preventDefault();
		this.handle.loadNextPage();
	}
});

Template.newApps.helpers({
  options: function(){
    return {
      sort: {submitted: -1},
      handle: newAppsHandle
    }
  }
});

Template.popularApps.helpers({
  options: function(){
    return {
      sort: {votes: -1, submitted: -1},
      handle: popularAppsHandle
    }
  }
});