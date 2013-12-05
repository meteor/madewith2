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
      pkgs: getPkgData(computeURL("github.com/", 
              $(e.target).find('[name=source]').val()), 
              function (err, res) { 
                var myPackages = parsePkgData(atob(res.data.content.replace(/\n/g, "")).split('\n'));
                console.log('myPackages');
                console.log(myPackages);
              }), 
    }
    console.log(appProperties.description);
    console.log(appProperties.pkgs);

    Apps.update(currentAppId, {$set: appProperties}, function(error) {
      if (error) {
        // display the error to the user
        alert(error.reason);
      } else {
        console.log(currentAppId);
        Router.go('appPage', {_id: currentAppId});
      }
    });
    console.log(appProperties.description);
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

// parse pkg data 
var parsePkgData = function (myPkgsRaw) {
  for (var x = myPkgsRaw.length - 1; x >= 0; x--) {
    if (myPkgsRaw[x] === '' || myPkgsRaw[x].indexOf('#') === 0){ 
      myPkgsRaw.splice(x, 1); // delete blank and commented lines
    };
  };
  return myPkgsRaw;
}


// get package list from github
var getPkgData = function (myURL, cb) {
  Meteor.http.get(myURL, {}, cb);
}

// compute link to package list
var computeURL = function(sourceDomain, mySource){
  var repoId    = mySource.substring(mySource.indexOf(sourceDomain,0)+sourceDomain.length,mySource.length);
  return "https://api.github.com/repos/" + repoId + "/contents/.meteor/packages";
}