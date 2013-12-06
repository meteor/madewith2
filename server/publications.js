Meteor.publish('newApps', function(limit) {
  	return Apps.find({}, {sort: {submitted: -1}, limit:limit});
});

Meteor.publish('popularApps', function(limit) {
  	return Apps.find({}, {sort: {score: -1, submitted: -1}, limit:limit});
});

Meteor.publish('singleApp', function(id){
	return id && Apps.find(id);
});

Meteor.publish('comments', function(appId){
	return Comments.find({appId: appId}, {sort: {submitted: -1}});
});


Meteor.methods({
	get_packages: function(sourceURL) {

		// parse pkg data 
		var parsePkgData = function (myPkgsRaw, myPackages) {
		  for (var x = myPkgsRaw.length - 1; x >= 0; x--) {
		    if (myPkgsRaw[x] === '' || myPkgsRaw[x].indexOf('#') === 0){ 
		      myPkgsRaw.splice(x, 1); // delete blank and commented lines
		    };
		  };
		  return myPkgsRaw;
		}

		// get package list from github
		var getPkgData = function (myURL, cb) {
		  Meteor.http.get(myURL, {headers: {"User-Agent": "Meteor/1.0"}}, cb);
		}

		// compute link to package list
		var computeURL = function(sourceDomain, mySource){
		  var repoId    = mySource.substring(mySource.indexOf(sourceDomain,0)+sourceDomain.length,mySource.length);
		  return "https://api.github.com/repos/" + repoId + "/contents/.meteor/packages?client_id=954e1df2d25fc3e401dd&client_secret=0050520b79f773096a9c19e1284bcb62f792163d";
		}

		var Future = Npm.require("fibers/future");
    	var pkgFuture = new Future();

    	getPkgData(computeURL("github.com/", sourceURL), 
	      function (err, res) { 
            var content = res.data.content || ''
	        myPackages = parsePkgData(new Buffer(content.replace(/\n/g, "") || '', 'base64').toString('utf8').split('\n'));
	        pkgFuture.return(myPackages);
	      });
    	var myPkgFuture = pkgFuture.wait();

        return myPkgFuture;   
	}
});

