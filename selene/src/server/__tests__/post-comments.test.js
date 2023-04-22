const {
  pushReply,
  deleteAction,
  editAction,
  findCommentIndexAndParent,
} = require("../post-comments");
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

describe("editAction", () => {
  it("should edit a comment when editData has only comId", () => {
    const comments = [{ comId: 1, text: "Frogs" }];
    const editData = { comId: 1, text: "Rabbits" };
    editAction(comments, editData);
    expect(comments).toStrictEqual([{ comId: 1, text: "Rabbits" }]);
  });
  it("should edit the reply when editData has parentId and comId", () => {
    const comments = [
      {
        comId: 1,
        text: "This is the first comment",
        replies: [
          { comId: 2, text: "This is a reply to the first comment" },
          { comId: 3, text: "This is another reply to the first comment" },
        ],
      },
    ];
    const editData = {
      comId: 2,
      parentOfEditedCommentId: 1,
      text: "Edited comment",
    };
    editAction(comments, editData);
    expect(comments).toStrictEqual([
      {
        comId: 1,
        text: "This is the first comment",
        replies: [
          { comId: 2, text: "Edited comment" },
          { comId: 3, text: "This is another reply to the first comment" },
        ],
      },
    ]);
  });
  it("preserves the replies when a comment is edited", () => {
    const comments = [
      {
        comId: 1,
        text: "This is the first comment",
        replies: [
          { comId: 2, text: "This is a reply to the first comment" },
          { comId: 3, text: "This is another reply to the first comment" },
        ],
      },
    ];

    const editData = { comId: 1, text: "editted comment" };
    editAction(comments, editData);
    expect(comments).toStrictEqual([
      {
        comId: 1,
        text: "editted comment",
        replies: [
          { comId: 2, text: "This is a reply to the first comment" },
          { comId: 3, text: "This is another reply to the first comment" },
        ],
      },
    ]);
  });
});

describe("findCommentIndexAndParent", () => {
  const comments = [
    {
      comId: 1,
      text: "This is the first comment",
      replies: [
        { comId: 2, text: "This is a reply to the first comment" },
        { comId: 3, text: "This is another reply to the first comment" },
      ],
    },
    {
      comId: 4,
      text: "This is the second comment",
      replies: [],
    },
  ];

  it("returns the correct index and parent when given a comId and no parentId", () => {
    const [parent, index] = findCommentIndexAndParent(comments, { comId: 4 });
    expect(parent).toStrictEqual(comments);
    expect(index).toStrictEqual(1);
  });

  it("returns the correct index and parent when given a parentId and comId", () => {
    const [parent, index] = findCommentIndexAndParent(comments, {
      parentId: 1,
      comId: 3,
    });
    expect(parent).toStrictEqual(comments[0].replies);
    expect(index).toStrictEqual(1);
  });

  it("returns null and -1 if the parentId is not found", () => {
    const [parent, index] = findCommentIndexAndParent(comments, {
      parentId: 99,
      comId: 3,
    });
    expect(parent).toBeNull();
    expect(index).toStrictEqual(-1);
  });

  it("returns null and -1 if the comId is not found", () => {
    const [parent, index] = findCommentIndexAndParent(comments, {
      parentId: 1,
      comId: 99,
    });
    expect(parent).toBeNull();
    expect(index).toStrictEqual(-1);
  });

  it("returns null and -1 if both parentId and comId are not found", () => {
    const [parent, index] = findCommentIndexAndParent(comments, {
      parentId: 99,
      comId: 99,
    });
    expect(parent).toBeNull();
    expect(index).toStrictEqual(-1);
  });
});
