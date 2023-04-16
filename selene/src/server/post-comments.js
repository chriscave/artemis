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

    let parent = commentData;
    let commentToDelete = parent.find(
      (comment) => comment["comId"] === deleteId
    );
    if (deleteData["parentOfDeleteId"]) {
      parent = commentToDelete["replies"];
      commentToDelete = parent.find((comment) => comment["comId"] === deleteId);
    }
    parent.splice(parent.indexOf(commentToDelete), 1);
  },
};
