Comments = new Meteor.Collection('comments');


Meteor.methods({
  comment: function(commentAttributes) {
    var user = Meteor.user();

    
    var app = Apps.findOne(commentAttributes.appId);

    if (!commentAttributes.body)
      throw new Meteor.Error(422, "I didn't see your comment. Try again?");
    if (!commentAttributes.appId)
      throw new Meteor.Error(422, "Huh. We weren't sure which app that comment was for. Try again?");
    comment = _.extend(_.pick(commentAttributes, 'appId', 'body', 
      'parentComment','children'), {
      userId: user._id,
      author: user.profile.name,
      submitted: new Date().getTime(),
      votes: 0
    });

    //update the app with the number of comments
    Apps.update(comment.appId, {$inc: {commentsCount: 1}});

    return Comments.insert(comment);
    

  },

  notifyParents: function(comment, commentId){
    //notify parent comments of their new children
    Comments.update({_id: comment.parentComment,children: {$ne: commentId}}, 
                    {$addToSet: {children: commentId},
    });
  },
  commentvote: function(commentId){
    var user = Meteor.user(); //ensure user is logged in
    if (!user) {
      if (Meteor.isServer) {
        throw new Meteor.Error(401, "You need to login to upvote");
      } else {
        Meteor.loginWithMeteorDeveloperAccount(function (err) {
          if (!err)
            Meteor.call('commentvote', appId);
        });
        return;
      }
    }

    var comment = Comments.findOne(commentId);

    if (!comment)
      throw new Meteor.Error(422, 'Comment not found');
    if (_.include(comment.upvoters, user._id))
      return;
      // throw new Meteor.Error(422, 'Already upvoted this app');
    Comments.update({
        _id: commentId, 
        upvoters: {$ne: user._id}
      }, {
        $addToSet: {upvoters: user._id},
        $inc: {votes: 1},
    });
  }
});


