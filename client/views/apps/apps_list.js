
Template.appsList.helpers({
  apps: function() {
    //return Apps.find();
    return Apps.find({}, {sort: {submitted: -1}});
  }
});
