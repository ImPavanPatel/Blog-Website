import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let posts = [];

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/post", (req, res) => {
  res.render("post.ejs");
});

app.post("/submit", (req, res) => {
  const { title, content } = req.body;
  const newPost = { title, content };
  posts.push(newPost);
  res.render("index.ejs", { posts });
});

app.get("/edit/:title1", (req, res) => {
  const { title1 } = req.params;
  const post = posts.find((post) => post.title === title1);
  res.render("edit.ejs", { post });
});

app.post("/edit/:title1", (req, res) => {
  const { title1 } = req.params;
  const { title, content } = req.body;
  const postIndex = posts.findIndex((post) => post.title === title1);
  if (postIndex !== -1) {
    posts[postIndex] = { title, content };
  }
  res.render("index.ejs", { posts });
});

app.post("/delete/:title1", (req, res) => {
  const { title1 } = req.params;
  posts = posts.filter((post) => post.title !== title1);
  res.render("index.ejs", { posts });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
})