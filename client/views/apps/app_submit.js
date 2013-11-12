Template.appSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var app = {
      url: $(e.target).find('[name=url]').val(),
      source: $(e.target).find('[name=source]').val(),
      title: $(e.target).find('[name=title]').val(),
      message: $(e.target).find('[name=description]').val()
    }

    app._id = Apps.insert(app);
    Router.go('appPage', app);
  }
});