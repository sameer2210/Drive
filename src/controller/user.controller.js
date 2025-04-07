const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/users.models");
const { validationResult } = require("express-validator");

module.exports.createUserGet = (req, res) => {
  const {error} = req.query;
  res.render("register",{error});
};

module.exports.createUserPost = async (req, res) => {
  const errors = validationResult(req);
  // console.log(errors);
  if (!errors.isEmpty()) {
    return res.redirect("/users/?error=Invalid input, please try again.");
    // return res.status(400).json({
    //   errors: errors.array(),
    //   message: "Invalid data Try again"
    // });
    // res.send(errors);
  }
  try {
    const { userName, email, password } = req.body;

    const existUser = await userModel.findOne({ email });

    if (existUser) {
      // res.send(`user already Exist`);
      // return res.status(400).json({ message: "User already exists" });
      return res.redirect("/users/?error=User already exists, please try again.");

    }
    const hashPassword = await bcryptjs.hash(password, 10);

    const newUser = await userModel.create({
      userName,
      email,
      password: hashPassword
    });

    const token = jwt.sign(
      {
        id: newUser._id,
        email: newUser.email
      },
      process.env.jwt_seC_key
    );

    res.cookie("token", token);
    res.redirect("/users/login");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// -------------------------------------------------------------------------------------------------------

module.exports.loginUserGet = (req, res) => {
  const { error } = req.query;
  res.render("login", { error });
};
module.exports.loginUserPost = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existUser = await userModel.findOne({ email });
    // console.log(existUser);
    if (!existUser) {
      // return res.redirect("/users/");
      return res.redirect("/users/?error=User does not exist, please register or Retry.");
    }

    const isMatch = await bcryptjs.compare(password, existUser.password);
    if (!isMatch) {
      // return res.send(`Password not match`);
      return res.redirect("/users/login?error=Password does not match, please try again.");
    }
    const token = jwt.sign(
      {
        id: existUser._id,
        email: existUser.email
      },
      process.env.jwt_seC_key
    );

    res.cookie("token", token);
    res.redirect("/users/profile");
    //  res.status(201).cookie("token", token).json({
    //     message: "User registered successfully",
    //   });
  } catch (error) {
    console.error("Login error:", error);          // Optional: log to console
    res.status(500).json({ error: error.message });
    // res.redirect('/login')
  }
};

module.exports.profileUserGet = (req, res) => {
  res.render("profile");
};

// module.exports.logoutUserGet = (req, res) => {
//   res.cookie("token", "");
//   res.render('/login');
// };

module.exports.logoutUserGet = (req, res) => {
  res.clearCookie("token");
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        console.log("Error destroying session:", err);
      }
    });
  }
  res.redirect("/login");
};
