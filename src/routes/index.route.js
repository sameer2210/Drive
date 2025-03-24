const express = require("express");
const router = express.Router();

const upload = require("../helper/multer");

const {
  profileGet,
  showGet,
  uploadPost
} = require("../controller/index.controller");

router.get("/profile", profileGet);

router.get("/show", showGet);

// Handle file upload
router.post("/upload", upload, uploadPost);

module.exports = router;
