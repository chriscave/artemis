// Express server
const postComments = require("./post-comments");
const pushReply = postComments.pushReply;
const deleteAction = postComments.deleteAction;
const express = require("express");
const app = express();
const fs = require("fs");
const bodyParser = require("body-parser");
const port = 5000;
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/load-comments", (req, res) => {
  try {
    const jsonData = JSON.parse(fs.readFileSync("data.json"));
    console.log("read data", jsonData);
    res.json(jsonData);
  } catch (err) {
    console.error(err);
  }
});

app.post("/api/submit-comment", (req, res) => {
  const submitData = req.body;
  const commentData = JSON.parse(fs.readFileSync("data.json"));
  commentData.push(submitData);
  fs.writeFile("data.json", JSON.stringify(commentData, (space = 2)), (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error saving data");
    } else {
      res.send("Data saved successfully");
    }
  });
});
app.post("/api/submit-reply", (req, res) => {
  const replyData = req.body;
  const commentData = JSON.parse(fs.readFileSync("data.json"));
  pushReply(commentData, replyData);
  fs.writeFile("data.json", JSON.stringify(commentData, (space = 2)), (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error saving data");
    } else {
      res.send("Data saved successfully");
    }
  });
});

app.post("/api/delete-action", (req, res) => {
  const deleteData = req.body;
  const commentData = JSON.parse(fs.readFileSync("data.json"));
  deleteAction(commentData, deleteData);
  fs.writeFile("data.json", JSON.stringify(commentData, (space = 2)), (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error saving data");
    } else {
      res.send("Data saved successfully");
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
