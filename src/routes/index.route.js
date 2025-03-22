const express = require("express");
const router = express.Router();

const cloudinary = require("../helper/upload");
const upload = require("../helper/multer");

router.get("/profile", (req, res) => {
  res.render("profile");
});

// Handle file upload
router.post("/upload", upload, async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    // Upload file buffer to Cloudinary
    const result = await cloudinary(req.file.buffer);
    console.log(result);
    res.send("done");

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error uploading file", error: error.message });
  }
});

module.exports = router;
