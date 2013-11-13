Template.appSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var app = {
      url: $(e.target).find('[name=url]').val(),
      source: $(e.target).find('[name=source]').val(),
      title: $(e.target).find('[name=title]').val(),
      description: $(e.target).find('[name=description]').val()
      //author: 
    }

    Meteor.call('app', app, function(error, id) {
      if (error){
        //display error to user
        throwError(error.reason);
        // if the error is that the post already exists, take us there
        if (error.error === 302)
          //Router.go('err302Page', error.details)
          //Router.go('err302Page',id)
          Router.go('appPage', {_id: error.details})
      } else {
        Router.go('appPage', id)
        //Router.go('appPage', {_id: id});
        //TODO: when 'newest' is implemented, people should be sent to /newest
      }
    });
  }
});