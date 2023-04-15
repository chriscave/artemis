function pushReply(commentData, replyData) {
  const replyParentId =
    replyData["parentOfRepliedCommentId"] ?? replyData["repliedToCommentId"];
  const parentComment = commentData.find(
    (comment) => comment["comId"] === replyParentId
  );

  parentComment["replies"].push(replyData);
}

module.exports = pushReply;
