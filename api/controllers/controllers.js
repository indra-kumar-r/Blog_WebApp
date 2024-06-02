const { default: mongoose } = require("mongoose");
const User = require("../models/User");
const Posts = require("../models/Post");
const LikePost = require("../models/LikePost");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

let salt = bcrypt.genSaltSync(10);
let jwtSalt = "1q@2w#3e$4r5%";

mongoose.connect("mongodb://localhost:27017/BlogWebApp");

// registration

module.exports.register = async (req, res) => {
  let { username, password } = req.body;
  try {
    const user = new User({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    const UserDoc = await user.save();
    res.status(200).json(UserDoc);
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      res.status(400).json({ errors });
    } else if (error.message.includes("Username already exists")) {
      res.status(400).json({ errors: [error.message] });
    } else {
      res.status(400).json({ errors: "Internal server error" });
    }
  }
};

// login and logout

module.exports.login = async (req, res) => {
  let { username, password } = req.body;
  try {
    const UserDoc = await User.findOne({ username });
    let passOk = bcrypt.compareSync(password, UserDoc.password);
    if (passOk) {
      jwt.sign({ username, id: UserDoc._id }, jwtSalt, {}, (err, token) => {
        if (err) throw err;
        res.cookie("token", token).status(200).json({
          id: UserDoc._id,
          username,
        });
      });
    } else {
      res.status(400).json({});
    }
  } catch (e) {
    res.status(400).json({ message: "Login failed." });
  }
};

module.exports.logout = (req, res) => {
  res.cookie("token", "").json("ok");
};

// get user details

module.exports.profile = (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSalt, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
};

// CRUD and other options for post

module.exports.p_post = async (req, res) => {
  const { title, summary, content, cover } = req.body;
  try {
    const { token } = req.cookies;
    jwt.verify(token, jwtSalt, {}, async (err, info) => {
      if (err) {
        throw err;
      }
      await Posts.create({
        title,
        summary,
        content,
        cover,
        author: info.id,
      });
    });

    res.json({ message: "Post created successfully!" });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ message: "Failed posting the Post!" });
  }
};

module.exports.g_post = async (req, res) => {
  try {
    const posts = await Posts.find()
      .populate("author", ["username"])
      .sort({ updatedAt: -1 })
      .limit(20);
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Failed to fetch posts" });
  }
};

module.exports.u_post = async (req, res) => {
  let { title, summary, content, cover, id } = req.body;
  try {
    let { token } = req.cookies;
    jwt.verify(token, jwtSalt, {}, async (err, info) => {
      if (err) {
        throw err;
      }
      let postDoc = await Posts.findById(id);
      let isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
      if (!isAuthor) {
        res.status(400).json("Invalid Author");
        throw "Invalid Author!";
      }
      await postDoc.updateOne({
        title,
        summary,
        content,
        cover,
      });
    });
    res.json({ message: "Post created successfully!" });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ message: "Failed posting the Post!" });
  }
};

module.exports.d_post = async (req, res) => {
  try {
    let { id } = req.params;
    await Posts.deleteOne({ _id: id });
    res.status(200).json({ message: "Post deleted successfully." });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: "Failed to delete post." });
  }
};

module.exports.userpost = async (req, res) => {
  try {
    const posts = await Posts.find().sort({ updatedAt: -1 });
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Failed to fetch posts" });
  }
};

module.exports.g_post_id = async (req, res) => {
  let { id } = req.params;
  try {
    let post = await Posts.findById(id).populate("author", ["username"]);
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ error: error, message: "NotFound" });
  }
};

// like post

module.exports.p_like = async (req, res) => {
  const { postId, userName, likeStatus } = req.body;
  try {
    let data = new LikePost({ postId, userName, likeStatus });
    let likeData = await data.save();
    res.status(200).json({ likeData: likeData, liked: true });
  } catch (error) {
    res.status(400).json({ error: error, liked: false });
  }
};

module.exports.g_like = async (req, res) => {
  const { postId } = req.query;
  try {
    let data = await LikePost.findOne({ postId });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.d_like = async (req, res) => {
  const { postId } = req.body;
  try {
    await LikePost.deleteOne({ _id: postId });
    res.status(200).json({ delete: "success" });
  } catch (error) {
    res.status(400).json({ error: error, delete: "failed" });
  }
};

// reset password

module.exports.u_pwd = async (req, res) => {
  const { username, password } = req.body;
  try {
    let pwd = bcrypt.hashSync(password, salt);
    let data = await User.updateOne({ username }, { $set: { password: pwd } });
    res.status(200).json({ data: data, message: "success" });
  } catch (error) {
    res.status(400).json({ error: error, message: "failed" });
  }
};
