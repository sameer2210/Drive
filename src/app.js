const express = require("express");
const app = express();
const userRouter = require("./routes/user.route");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

app.set("view engine", "ejs");
app.set("views", "src/views");

app.use(express.json());
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/users", userRouter);

module.exports = app;
