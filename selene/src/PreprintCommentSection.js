import React, { useEffect, useState } from "react";
import { CommentSection } from "react-comments-section";
import "react-comments-section/dist/index.css";
// import { fs } from "fs";

function PreprintCommentSection() {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchComments() {
      const response = await fetch("api/load-comments");
      const json = await response.json();
      console.log("fetchData", json);
      setData(json);
    }
    fetchComments();
  }, []);
  async function submitComment(data) {
    await fetch("/api/submit-comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }
  async function submitReply(data) {
    await fetch("/api/submit-reply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  return (
    <CommentSection
      currentUser={{
        currentUserId: "01a",
        currentUserImg:
          "https://ui-avatars.com/api/name=Chris&background=random",
        // currentUserProfile: "https://www.linkedin.com/in/riya-negi-8879631a9/",
        currentUserFullName: "Chris Cave",
      }}
      logIn={{
        loginLink: "http://localhost:3001/",
        signupLink: "http://localhost:3001/",
      }}
      commentData={data}
      onSubmitAction={(data) => submitComment(data)}
      onDeleteAction={(data) => console.log("delete data", data)}
      onReplyAction={(data) => submitReply(data)}
      onEditAction={(data) => console.log("edit data", data)}
      currentData={(data) => console.log("current data", data)}
    />
  );
}

export default PreprintCommentSection;
