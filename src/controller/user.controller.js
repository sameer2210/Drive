const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/users.models");
const { validationResult } = require("express-validator");


module.exports.createUserGet = (req, res) => {
  res.render("register");
};

module.exports.createUserPost = async (req, res) => {
  const errors = validationResult(req);
  // console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
      message: "Invalid data Try again"
    });
    // res.send(errors);
  }
  try {
    const { userName, email, password } = req.body;

    const existUser = await userModel.findOne({ email });

    if (existUser) {
      // res.send(`user already Exist`);
      return res.status(400).json({ message: "User already exists" });
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

// -------------------------------------------------------------------------------

module.exports.loginUserGet = (req, res) => {
  res.render("login");
};
module.exports.loginUserPost = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existUser = await userModel.findOne({ email });

    if (!existUser) {
      // alert(`user not exist  please register....`);
      res.redirect("/users/");
    }

    const isMatch = await bcryptjs.compare(password, existUser.password);
    if (!isMatch) {
      res.send(`Password not match`);
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
    res.status(500).json({ error: error.message });
  }
};

module.exports.profileUserGet = (req, res) => {
  res.render("profile");
};
