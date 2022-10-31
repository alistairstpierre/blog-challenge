let express = require("express");
let bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://2dsparrow:1q0p2w9o@cluster0.s9qyi96.mongodb.net/test");

let app = express();

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.set("view engine", "ejs");

const blogPosts = [];

const postSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Post = mongoose.model("Post", postSchema);

const posts = Post.find({}, function(err, posts) {
  posts.forEach(element => {
    blogPosts.push({title: element.title, content: element.content});
  });
});

app.get("/", (req, res) => {
  res.render("index", { blogPosts: blogPosts });
});

app.get("/compose", (req, res) => {
  res.render("compose");
});

app.get("/post/:id", (req, res) => {
  res.render("post", { post: blogPosts[req.params.id] });
});

app.post("/", (req, res) => {
  const post = { title: req.body.postTitle, content: req.body.postBody }
  blogPosts.push(post);
  Post.create(post, function(err, post) {console.log(err)});
  res.redirect("/");
});

app.listen(3000, () => console.log("Example app listening on port 3000!"));
