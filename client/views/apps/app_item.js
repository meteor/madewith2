Template.appItem.helpers({
  ownApp: function() {
    return this.userId == Meteor.userId();
  },
  domain: function() {
    var a = document.createElement('a');
    a.href = this.url;
    return a.hostname;
  }
});

/*Template.appsList.helpers({
  apps: function() {
    return Apps.find();
  }
});*/