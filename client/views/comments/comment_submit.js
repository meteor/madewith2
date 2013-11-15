Template.commentSubmit.events({
  'submit form': function(e, template) {
    e.preventDefault();

    var $body = $(e.target).find('[name=body]');
    var comment = {
      body: $body.val(),
      appId: template.data._id
    };

    //original version
    //Meteor.call('comment', comment, commentRefresh(error, commentId));


    var isChild = Session.equals('comment-id', comment.appId);

    if (isChild) {
      //do this for the child version
    } else{
      //do this for root comment

    Meteor.call('comment', comment, function(error, commentId) {
        if (error){
          throwError(error.reason);
        } else {
          $body.val('');
        }
      });
    };
    

    
    console.log(comment.appId);
    console.log(Session.get('comment-id'));
    console.log(isChild);

    // if(getCurrentTemplate() == 'comment_reply'){
    //     //it's a child comment if it's a reply
    //     //keep this in mind for verbose mode
    //     var parentComment = this.comment;
    //     console.log(parentComment)
    //     Meteor.call('comment',parentComment.app,parentComment._id,body, commentRefresh(error, commentProperties));
    // } else {
    //     // root comment
    //     var app = this.app; //is this the right app?
    //     Meteor.call('comment',app._id, null, body, commentRefresh(error, commentProperties));
    // }
  }
});


function commentRefresh(error, commentId){
  if (error) {
    console.log(error);
    throwError(error.reason);
  } else{
    $body.val('');
  };
};
