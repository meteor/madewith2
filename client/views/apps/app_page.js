Template.appPage.helpers({
  currentApp: function() {
    return Apps.findOne(Session.get('currentAppId'));
  }
});