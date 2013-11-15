Template.commentSubmit.events({
  'submit form': function(e, template) {
    e.preventDefault();

    var $body   = $(e.target).find('[name=body]');
    var comment = {
      body:     $body.val(),
      appId:    template.data._id,
      children: []
    };

    var isChild = Session.equals('comment-id', comment.appId);

    if (isChild) {    //do this for the child version

      //the call above actually returned the parentComment Id
      comment.parentComment = comment.appId; 

      console.log('my parent is');
      console.log(comment.parentComment);

      //get the correct appId into comment.appId
      comment.appId = template.data.appId;

      console.log('the app i\'m talking about is');
      console.log(comment.appId);

      //identify the parent
      myParent = Comments.findOne({_id: comment.parentComment});

      //post it?
      //how do we render them?  worry about that later.

    } else{           //do this for root comment

      comment.parentComment = null; //set parent to null
      console.log('I have no parents');

      console.log('the app i\'m talking about is');
      console.log(comment.appId);

    };
    
    //post the comment
    Meteor.call('comment', comment, function(error, commentId) {
      if (error){
        throwError(error.reason);
      } else {
        $body.val('');
        console.log(commentId);

        if (isChild){         //tell the parents
            Comments.update({
                    _id: comment.parentComment,
               children: {$ne: commentId}
            }, {
              $addToSet: {children: commentId},
            });
        }

      }
    });

    //console.log(commentId);
    
    // console.log(comment.appId);
    // console.log(Session.get('comment-id'));
    // console.log(isChild);
    //console.log(template.data);
    //console.log(commentId);
    // console.log(comment.appId);

  }
});

