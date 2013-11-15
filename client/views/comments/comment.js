
Session.setDefault('comment-id', null);
// by default, you didn't click on any "reply"

Template.comment.baseDate = function(){
	return new Date(this.submitted);
}; //baseDate is used in {{timeago}}

Template.comment.is_hidden = function () {
	if (Session.equals('comment-id', this._id))
		return "show";
	return "hide";
}; //if the 'reply' clicked was yours, show comment box, else hide it

Template.comment.events({
	'click a.reply': function () {
		Session.set('comment-id', this._id);
	}
}); // register which reply the user clicked
