Template.appItem.helpers({
  domain: function() {
    var a = document.createElement('a');
    a.href = this.url;
    return a.hostname;
  }
});

Template.appsList.helpers({
  apps: function() {
    return Apps.find();
  }
});