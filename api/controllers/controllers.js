const { default: mongoose } = require("mongoose");
const User = require("../models/User");
const Posts = require("../models/Post");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

let salt = bcrypt.genSaltSync(10);
let jwtSalt = "1q@2w#3e$4r5%";

mongoose.connect("mongodb://localhost:27017/BlogWebApp");

module.exports.register = async (req, res) => {
  let { username, password } = req.body;
  try {
    const UserDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(UserDoc);
  } catch (e) {
    res.status(400).json(e);
  }
};

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

module.exports.profile = (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSalt, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
};

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
      .sort({ createdAt: -1 })
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
    let id = req.params.id;
    await Posts.findByIdAndDelete(id);
    res.status(200).json({ message: "Post deleted successfully." });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: "Failed to delete post." });
  }
};

module.exports.userpost = async (req, res) => {
  try {
    const posts = await Posts.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Failed to fetch posts" });
  }
};

module.exports.g_post_id = async (req, res) => {
  let { id } = req.params;
  let post = await Posts.findById(id).populate("author", ["username"]);
  res.json(post);
};

module.exports.logout = (req, res) => {
  res.cookie("token", "").json("ok");
};
