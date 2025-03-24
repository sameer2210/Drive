const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  postImage: {
    type: String
  }
});

const postModel = mongoose.model("post", postSchema);
module.exports = postModel;
