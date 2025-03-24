const cloudinary = require("../helper/upload");
const postModel = require("../models/post.models");

module.exports.profileGet = (req, res) => {
  res.render("profile");
};

module.exports.showGet = async (req, res) => {
  const allPost = await postModel.find();
  res.render("show", { allPost });
};

module.exports.uploadPost = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    // Upload file buffer to Cloudinary
    const result = await cloudinary(req.file.buffer);

    const data = new postModel({
      postImage: result
    });
    await data.save();
    console.log(data, "he");
    res.redirect("/show");
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error uploading file", error: error.message });
  }
};
