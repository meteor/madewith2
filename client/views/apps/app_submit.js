Template.appSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var user = Meteor.user();

    var app = {
      url:    $(e.target).find('[name=url]').val(),
      source: $(e.target).find('[name=source]').val(),
      title:  $(e.target).find('[name=title]').val(),
      description: $(e.target).find('[name=description]').val(),
      author: user.profile.name,
      pkgs:'',
      commentCount: 0,
    }

    Meteor.call('app', app, function(error, id) {
      if (error){        //display error to user
        throwError(error.reason);
        // if the error is that the app already exists, take us there
        if (error.error === 302)
          Router.go('appPage', {_id: error.details})
      } else {
        Router.go('appPage', {_id: id});
      }
    });
  }
});