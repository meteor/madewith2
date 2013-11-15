Comments = new Meteor.Collection('comments');

Meteor.methods({
  comment: function(commentAttributes) {
    var user = Meteor.user();
    var app = Apps.findOne(commentAttributes.appId);
    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "Oops, you need to login to add comments.");
    if (!commentAttributes.body)
      throw new Meteor.Error(422, "I didn't see your comment. Try again?");
    if (!commentAttributes.appId)
      throw new Meteor.Error(422, "Huh. We weren't sure which app that comment was for. Try again?");
    comment = _.extend(_.pick(commentAttributes, 'appId', 'body', 
      'parentComment','children'), {
      userId: user._id,
      author: user.profile.name,
      submitted: new Date().getTime(),
    });

        //update the app with the number of comments
	   Apps.update(comment.appId, {$inc: {commentsCount: 1}});

    return Comments.insert(comment);
  },

  notifyParents: function(comment, commentId){
    //notify parent comments of their new children
    Comments.update({_id: comment.parentComment,
                children: {$ne: commentId}
                    }, 
                    {$addToSet: {children: commentId},
    });
    console.log(Comments.findOne({_id: comment.parentComment}));
  }
});
