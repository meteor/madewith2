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

// Meteor.methods({
//     openSession: function() {
//         var fut = new Future(), url = 'http://www.google.com';

//         // Do call here, return value with Future
//         Meteor.http.get(url, function( err, res ){
//             fut.ret(res);
//         });

//         // Force method to wait on Future return
//         return fut.wait();
//     }

// });

Meteor.methods({
	get_packages: function(pSource) {
		var fut = new Future(), url = pSource;
		// var pkglist = '';
		console.log('get packages from');
		console.log(pSource);
		// $ = pkglist.load(Meteor.http.get(pSource).content);
		res = Meteor.http.get(url, function( err, res ){
            fut.ret(res);
        });
        return fut.wait();
		// console.log(res.statusCode, res.data);
		// return $('.commit-title').text().trim()      
	}
});