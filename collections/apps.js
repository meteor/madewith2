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
      throw new Meteor.Error(401, "Oops! You need to login to submit your app.");

    // ensure the post has a title
    if (!appAttributes.title)
      throw new Meteor.Error(422, 'Your app needs a name.');

    // check that there are no previous posts with the same link
    if (appAttributes.url && appWithSameLink) {
      throw new Meteor.Error(302, 
        'This app has already been posted.', 
        appWithSameLink._id);
    }

    // pick out the whitelisted keys
    var app = _.extend(_.pick(appAttributes, 'url', 'title', 'source','description'), {
      userId: user._id, 
      author: user.username, 
      submitted: new Date().getTime()
    });

    var appId = Apps.insert(app);

    return appId;
  }
});