Template.badgePage.helpers({
	ivoted: function(){
    return voted(Meteor.userId(), this);
  }
});


Template.badgePage.events({
  'click .madewith_upvote': function(event) {
    Meteor.call('upvote', this._id);

    // stop these so you don't click through the link to go to the
    // app.
    event.stopPropagation();
    event.preventDefault();
  }
});

function voted (userId, self) {
  return (userId && _.include(self.upvoters, userId));
}