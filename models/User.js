const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
const Schema = mongoose.Schema;
const Resume=require("./Resume.js")
const userObj = {
  full_name: { type: String, default: "" },
  gender: { type: String, default: "Other" },
  username: { type: String, require: true },
  googleId: { type: String },
  password: { type: String },
  isAdmin: { type: Boolean, default: false },
  dateRegistered: { type: Date, default: Date.now() },
  resumes: { type: Schema.Types.ObjectId, ref: "Resume" },
  created: { type: String, default: "" },
};

const userSchema = new Schema(userObj);
const User = mongoose.model("user", userSchema);

module.exports = User;
