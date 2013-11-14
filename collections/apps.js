Apps = new Meteor.Collection('apps');

Apps.allow({
  update: ownsDocument,
  remove: ownsDocument
});

Meteor.methods({
  app: function(appAttributes) {
    var user = Meteor.user(),
      appWithSameLink = Apps.findOne({url: appAttributes.url});

    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "Doh! You need to login to share your app.");

    // ensure the app has a title
    if (!appAttributes.title)
      throw new Meteor.Error(422, 'Oh snap! Your app needs a name. I hope it has one.');

    // check that there are no previous apps with the same link
    if (appAttributes.url && appWithSameLink) {
      throw new Meteor.Error(302, 
        'Oops! Looks like this app has already been shared. Give it some <3!', 
        appWithSameLink._id);
    }

    // pick out the whitelisted keys
    var app = _.extend(_.pick(appAttributes, 'url', 'title', 'source','description'), {
      userId: user._id, 
      author: user.profile.name, 
      submitted: new Date().getTime(),
      commentsCount: 0
    });

    var appId = Apps.insert(app);

    return appId;
  }
});