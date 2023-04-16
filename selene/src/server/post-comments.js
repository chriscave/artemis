module.exports = {
  pushReply: function (commentData, replyData) {
    const replyParentId =
      replyData["parentOfRepliedCommentId"] ?? replyData["repliedToCommentId"];
    const parentComment = commentData.find(
      (comment) => comment["comId"] === replyParentId
    );

    parentComment["replies"].push(replyData);
  },
  deleteAction: function (commentData, deleteData) {
    const deleteId =
      deleteData["parentOfDeleteId"] ?? deleteData["comIdToDelete"];

    const comment = commentData.find(
      (comment) => comment["comId"] === deleteId
    );

    if (deleteData["parentOfDeleteId"]) {
      const parentReplies = comment["replies"];
      const replyToDelete = parentReplies.find(
        (reply) => reply["comId"] === deleteId
      );
      parentReplies.splice(parentReplies.indexOf(replyToDelete), 1);
    } else {
      commentData.splice(commentData.indexOf(comment), 1);
    }
  },
};
