const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    minlength: [3, "user name must be grater then 3 characters long"]
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: [3, "user name must be grater then 3 characters long"]
  }
});

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
