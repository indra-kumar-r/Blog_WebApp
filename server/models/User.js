const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      minLength: [4, "Username must be at least 4 characters long"],
      unique: [true, "Username already exists"],
    },
    password: { type: String, required: true },
    userimage: { type: String, default: null },
    usertagline: { type: String, default: null },
    userlocation: { type: String, default: null },
    userposts: { type: Number, default: 0 },
    userfollowing: { type: Number, default: 0 },
    userfollowers: { type: Number, default: 0 },
    userliked: { type: Number, default: 0 },
    usersaved: { type: Number, default: 0 },
    role: { type: String, default: "user" },
  },
  {
    timestamps: true,
  }
);

UserSchema.post("save", (error, doc, next) => {
  if (error.name === "MongoServerError" && error.code === 11000) {
    next(new Error("Username already exists"));
  } else {
    next(error);
  }
});

const UserModel = model("User", UserSchema, "BlogUsers");

module.exports = UserModel;
