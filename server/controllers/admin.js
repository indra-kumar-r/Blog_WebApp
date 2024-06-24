const { default: mongoose } = require("mongoose");
const User = require("../models/User");
const Posts = require("../models/Post");
const LikePost = require("../models/LikePost");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

let salt = bcrypt.genSaltSync(10);
let jwtSalt = "1q@2w#3e$4r5%";

mongoose.connect("mongodb://localhost:27017/BlogWebApp");

// users

module.exports.get_users = async (req, res) => {
  try {
    let data = await User.find({ role: "user" }).sort({ createdAt: 1 });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.get_posts = async (req, res) => {
  try {
    let data = await Posts.find().sort({ createdAt: 1 });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.post_status = async (req, res) => {
  try {
    const { id, postStatus } = req.params;
    await Posts.updateOne(
      { _id: id },
      { $set: { hidden: postStatus === "true" } }
    );
    res.status(200).json({ message: "Post status updated successfully." });
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.del_post = async (req, res) => {
  try {
    let { id } = req.params;
    let data = await Posts.deleteOne({ _id: id });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};
