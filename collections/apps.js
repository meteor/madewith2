Apps = new Meteor.Collection('apps');

Apps.allow({
  insert: function(userId, doc) {
    // only allow posting if you are logged in
    return !! userId;
  }
});