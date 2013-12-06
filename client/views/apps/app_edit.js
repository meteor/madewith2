Template.appEdit.helpers({
  app: function() {
    return Apps.findOne(Session.get('currentAppId'));
  }
});

Template.appEdit.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentAppId = Session.get('currentAppId');

    Meteor.call('get_packages', $(e.target).find('[name=source]').val(), function(err, myPackages){

      var appProperties = {
        url: $(e.target).find('[name=url]').val(),
        title: $(e.target).find('[name=title]').val(),
        source: $(e.target).find('[name=source]').val(),
        description: $(e.target).find('[name=description]').val(),
        pkgs: myPackages
      }

      Apps.update(currentAppId, {$set: appProperties}, function(error) {
        if (error) {
          // display the error to the user
          alert(error.reason);
        } else {
          Router.go('appPage', {_id: currentAppId});
        }
      });

    });
  },

  'click .delete': function(e) {
    e.preventDefault();

    if (confirm("Delete this app?")) {
      var currentAppId = Session.get('currentAppId');
      Apps.remove(currentAppId);
      Router.go('home');
    }
  }
});
