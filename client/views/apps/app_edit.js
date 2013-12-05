Template.appEdit.helpers({
  app: function() {
    return Apps.findOne(Session.get('currentAppId'));
  }
});

Template.appEdit.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentAppId = Session.get('currentAppId');

    var appProperties = {
      url: $(e.target).find('[name=url]').val(),
      title: $(e.target).find('[name=title]').val(),
      source: $(e.target).find('[name=source]').val(),
      description: $(e.target).find('[name=description]').val(),
      pkgs: getPkgData(computeURL("github.com/", $(e.target).find('[name=source]').val()), function (err, res) { 
        // console.log('test inside');
        // console.log(res.data.content);
        // var myPackages64 = res.data.content;
        var myPackages = atob(res.data.content.replace(/\n/g, ""));
        console.log(myPackages);
      }), 
    }

    Apps.update(currentAppId, {$set: appProperties}, function(error) {
      if (error) {
        // display the error to the user
        alert(error.reason);
      } else {
        console.log(currentAppId);
        Router.go('appPage', {_id: currentAppId});
      }
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

// get package list from github
var getPkgData = function (myURL, cb) {
  Meteor.http.get(myURL, {}, cb);
}

// compute link to package list
var computeURL = function(sourceDomain, mySource){
  var repoId    = mySource.substring(mySource.indexOf(sourceDomain,0)+sourceDomain.length,mySource.length);
  return "https://api.github.com/repos/" + repoId + "/contents/.meteor/packages";
}