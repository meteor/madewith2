// Template.comment_list.helpers({
// 	comments: function() {
// 		console.log(appId);
// 		return Comments.find({appId: this._id});
// 	}
// });

Session.setDefault('comment-id', null);

Template.comment.baseDate = function(){
	return new Date(this.submitted);
};

Template.comment.is_hidden = function () {
	if (Session.equals('comment-id', this._id))
		return "show";
	return "hide";
};

Template.comment.events({
	'click a.reply': function () {
		Session.set('comment-id', this._id);
	}
});

// Session ('Comment-id', _id of the main comment | null)