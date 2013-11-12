Template.appSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var app = {
      url: $(e.target).find('[name=url]').val(),
      source: $(e.target).find('[name=source]').val(),
      title: $(e.target).find('[name=title]').val(),
      message: $(e.target).find('[name=description]').val()
      //author: 
    }

    Meteor.call('app', app, function(error, id) {
      if (error)
        return alert(error.reason);
      //Router.go('appPage', id);
      Router.go('home');
    });
  }
});