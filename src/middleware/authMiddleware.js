const jwt = require("jsonwebtoken");
// const validationResult = require('../controller/user.controller');
const { body } = require("express-validator");

module.exports.authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token; // Get token from cookies

    if (!token) {
      return res.status(401).redirect("/users/login");
    }

    const decoded = jwt.verify(token, process.env.jwt_seC_key); // Verify token
    req.user = decoded; // Attach user data to request
    next(); // Proceed to the next middleware/controller
    //   console.log(token);
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports.validateUserRegistration = [
  body("userName")
    .trim()
    .isLength({ min: 3 })
    .withMessage(` user Name must be at least 3 character`),
  body("email").trim().isEmail().withMessage(`Invalid email formate`),
  body("password")
    .trim()
    .isLength({ min: 3 })
    .withMessage(`password must be at least 3 character`)
];

module.exports.validateUserLogin = [
  body("email").trim().isEmail().withMessage(`Invalid email formate`),
  body("password")
    .trim()
    .isLength({ min: 3 })
    .withMessage(`password must be at least 3 character`)
];
