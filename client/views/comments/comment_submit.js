Template.commentSubmit.events({
  'submit form': function(e, template) {
    e.preventDefault();

    var $body     = $(e.target).find('[name=body]');
      var comment = {
        body:     $body.val(),
        appId:    template.data._id,
        children: []
      };

    var isChild = Session.equals('comment-id', comment.appId);

      if (isChild) {    //do this for the child version

          //the call above actually returned the parentComment Id
          comment.parentComment = comment.appId; 

          //get the correct appId into comment.appId
          comment.appId = template.data.appId;

          postComment(comment, $body, isChild);

      } else{           //do this for root comment

          comment.parentComment = null; //set parent to null

          postComment(comment, $body, isChild);

      };
  }
});

function postComment(comment, $body, isChild){
          //post the comment
  Meteor.call('comment', comment, function(error, commentId) {
      if (error){
        throwError(error.reason);
      } else {
        $body.val('');
        if (isChild){
          Meteor.call('notifyParents', comment, commentId);
        }
      }

  });
};
