const postComments = require("../post-comments");
const pushReply = postComments.pushReply;
const deleteAction = postComments.deleteAction;
test("Reply of comment is pushed to parent", () => {
  const commentData = [{ comId: "A", replies: [] }];
  const replyData = {
    comId: "a1",
    repliedToCommentId: "A",
  };
  pushReply(commentData, replyData);
  expect(commentData).toStrictEqual([{ comId: "A", replies: [replyData] }]);
});

test("Reply is pushed to parent when there is alread a reply", () => {
  const commentData = [{ comId: "A", replies: [{ comId: "a1" }] }];
  const replyData = {
    comId: "a2",
    repliedToCommentId: "A",
  };
  pushReply(commentData, replyData);
  expect(commentData).toStrictEqual([
    { comId: "A", replies: [{ comId: "a1" }, replyData] },
  ]);
});

test("Reply is pushed to correct parent with more than one comment", () => {
  const commentData = [
    { comId: "A", replies: [] },
    { comId: "B", replies: [] },
  ];
  const replyData = {
    comId: "b1",
    repliedToCommentId: "B",
  };
  pushReply(commentData, replyData);
  expect(commentData).toStrictEqual([
    { comId: "A", replies: [] },
    { comId: "B", replies: [replyData] },
  ]);
});

test("Reply is pushed to corrent parent when it is a reply to a reply", () => {
  const commentData = [{ comId: "A", replies: [{ comId: "a1" }] }];
  const replyData = {
    comId: "a2",
    parentOfRepliedCommentId: "A",
    repliedToCommentId: "a1",
  };
  pushReply(commentData, replyData);
  expect(commentData).toStrictEqual([
    { comId: "A", replies: [{ comId: "a1" }, replyData] },
  ]);
});

test("Comment is deleted", () => {
  const commentData = [{ comId: "A", replies: [] }];
  const deleteData = { comIdToDelete: "A" };
  deleteAction(commentData, deleteData);
  expect(commentData).toStrictEqual([]);
});

test("Comment matching Id is deleted", () => {
  const commentData = [
    { comId: "A", replies: [] },
    { comId: "B", replies: [] },
  ];
  const deleteData = { comIdToDelete: "B" };
  deleteAction(commentData, deleteData);
  expect(commentData).toStrictEqual([{ comId: "A", replies: [] }]);
});

test("Reply Id is deleted", () => {
  const commentData = [{ comId: "A", replies: [{ comId: "a1" }] }];
  const deleteData = {
    comIdToDelete: "a1",
    parentOfDeleteId: "A",
  };
  deleteAction(commentData, deleteData);
  expect(commentData).toStrictEqual([{ comId: "A", replies: [] }]);
});
