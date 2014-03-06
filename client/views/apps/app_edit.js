Template.appEdit.helpers({
  app: function() {
    return appByHostname(Session.get('currentAppHostname'));
  },
  source: function () {
    return this.source || "";
  }
});

Template.appEdit.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentApp = appByHostname(Session.get('currentAppHostname'));

    Meteor.call('get_packages', $(e.target).find('[name=source]').val(), function(err, myPackages){

      var appProperties = {
        url: normalizeAppURL($(e.target).find('[name=url]').val()),
        title: $(e.target).find('[name=title]').val(),
        source: normalizeAppURL($(e.target).find('[name=source]').val()),
        description: $(e.target).find('[name=description]').val(),
        pkgs: myPackages
      }

      Apps.update(currentApp._id, {$set: appProperties}, function(error) {
        if (error) {
          // display the error to the user
          alert(error.reason);
        } else {
          Router.go('appPage', {hostname: stripHttp(appProperties.url)});
        }
      });

    });
  },

  'click .delete': function(e) {
    e.preventDefault();

    if (confirm("Delete this app?")) {
      var currentApp = appByHostname(Session.get('currentAppHostname'));
      Apps.remove(currentApp._id);
      Router.go('home');
    }
  }
});
