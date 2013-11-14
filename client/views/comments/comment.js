Template.comment.helpers({
	// baseDate: function() {
	// 	//return new Date(this.submitted).toString();
	// 	//var seconds = Math.floor((new Date() - this.timestamp) / 1000);
 //    	return ;
	// }
});

Template.comment.baseDate = function(){
	return new Date(this.submitted);
}