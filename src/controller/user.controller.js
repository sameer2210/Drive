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

  const { userName, email, password } = req.body;

  const existUser = await userModel.findOne({ email });

  if (existUser) {
    res.send(`user already Exist`);
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
};

module.exports.loginUserGet = (req, res) => {
  res.render("login");
};
module.exports.loginUserPost = async (req, res) => {
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
};

module.exports.profileUserGet = (req, res) => {
  res.render("profile");
};
