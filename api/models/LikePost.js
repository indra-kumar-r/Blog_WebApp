const mongoose = require("mongoose");

const { model, Schema } = mongoose;

const LikePostSchema = new Schema(
  {
    postId: { type: String },
    userName: { type: String },
    likeStatus: { type: Boolean },
  },
  {
    timestamps: true,
  }
);

const LikePostModel = model("LikePost", LikePostSchema, "BlogLikes");

module.exports = LikePostModel;
