const express = require("express");
const router = express.Router();
const {authMiddleware,validateUserRegistration,validateUserLogin} = require("../middleware/authMiddleware");
const {
  createUserGet,
  createUserPost,
  loginUserGet,
  loginUserPost,
  profileUserGet
} = require("../controller/user.controller");

// to start use /users/
router.get("/", createUserGet);
router.post("/create", validateUserRegistration, createUserPost);

router.get("/login", loginUserGet);
router.post("/login",validateUserLogin, loginUserPost);

router.get("/profile", authMiddleware, profileUserGet);

module.exports = router;
