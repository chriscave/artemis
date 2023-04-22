function pushReply(commentData, replyData) {
  const replyParentId =
    replyData["parentOfRepliedCommentId"] ?? replyData["repliedToCommentId"];
  const parentComment = commentData.find(
    (comment) => comment["comId"] === replyParentId
  );

  parentComment["replies"].push(replyData);
}
function deleteAction(commentData, deleteData) {
  const [parent, idx] = findCommentIndexAndParent(commentData, {
    parentId: deleteData.parentOfDeleteId,
    comId: deleteData.comIdToDelete,
  });
  parent.splice(idx, 1);
}
function editAction(commentData, editData) {
  const [parent, idx] = findCommentIndexAndParent(commentData, {
    parentId: editData.parentOfEditedCommentId,
    comId: editData.comId,
  });
  delete editData.parentOfEditedCommentId;
  if (parent[idx].replies) {
    editData.replies = parent[idx].replies;
  }
  parent.splice(idx, 1, editData);
}

function findCommentIndexAndParent(comments, { parentId, comId }) {
  if (!parentId) {
    const index = comments.findIndex((comment) => comment?.comId === comId);
    return [comments, index];
  }

  const parentComment = comments.find((comment) => comment?.comId === parentId);
  if (!parentComment) return [null, -1];

  const replyIndex = parentComment.replies.findIndex(
    (comment) => comment?.comId === comId
  );
  if (replyIndex === -1) return [null, -1];

  return [parentComment.replies, replyIndex];
}
module.exports = {
  pushReply,
  deleteAction,
  editAction,
  findCommentIndexAndParent,
};
