const express = require("express");
const router = express.Router();

const upload = require("../helper/multer");
const { authMiddleware } = require("../middleware/authMiddleware");

const {
  profileGet,
  showGet,
  uploadPost
} = require("../controller/index.controller");

router.get("/", (req, res) => {
  res.send(
    `<a href="/users" 
     style=" font-weight: bold; color: white; background-color:rgb(255, 22, 22); padding: 12px 20px; border-radius: 8px; display: inline-block; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 18px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); transition: all 0.3s ease-in-out;"
     onmouseover="this.style.backgroundColor='#0056b3'; this.style.transform='translate(-50%, -50%) scale(1.1)';" 
     onmouseout="this.style.backgroundColor='#007BFF'; this.style.transform='translate(-50%, -50%) scale(1)';">
     Get Started
    </a>
    `
  );
});

router.get("/profile", authMiddleware, profileGet);

router.get("/show", authMiddleware, showGet);

// Handle file upload
router.post("/upload", authMiddleware, upload, uploadPost);

module.exports = router;
