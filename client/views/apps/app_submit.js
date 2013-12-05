Template.appSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    // var githubDomain = "github.com/";
    var user = Meteor.user();

    //get link to source
    // var mySource = $(e.target).find('[name=source]').val();

    // compute link to package list
    // var myURL = computeURL(githubDomain, mySource);
    // console.log(computeURL(githubDomain, mySource));

    // get package list from github

    

    // var res = Meteor.http.get(pSource);
    // var res = Meteor.http.get(computeURL(), {}, cb);

  //     console.log(res);
  // console.log(res.data);
  // myPackages64 = data.content;
  // myPackages = atob(myPackages64.replace(/\n/g, ""));
  // console.log(myPackages);
  // return myPackages;

    console.log('test outside');

    var app = {
      url:    $(e.target).find('[name=url]').val(),
      source: $(e.target).find('[name=source]').val(),
      title:  $(e.target).find('[name=title]').val(),
      description: $(e.target).find('[name=description]').val(),
      author: user.profile.name,
      // packages: getPkgData(computeURL(githubDomain, mySource), function (err, res) { 
      //   console.log('test inside');
      //   console.log(res);
      //   var myPackages64 = data.content;
      //   var myPackages = atob(myPackages64.replace(/\n/g, ""));
      //   console.log(myPackages);
      // }),
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

// // get package list from github
// var getPkgData = function (myURL, cb) {
//   Meteor.http.get(myURL, {}, cb);
// }

// // compute link to package list
// var computeURL = function(sourceDomain, mySource){
//   var repoId    = mySource.substring(mySource.indexOf(sourceDomain,0)+sourceDomain.length,mySource.length);
//   return "https://api.github.com/repos/" + repoId + "/contents/.meteor/packages";
// }