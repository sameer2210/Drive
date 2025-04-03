const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  postImage: {
    type: String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user", // Make sure this matches the model name of your User schema
    required: true
  }
});

const postModel = mongoose.model("post", postSchema);
module.exports = postModel;
