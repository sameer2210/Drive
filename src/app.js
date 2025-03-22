const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const userRouter = require("./routes/user.route");
const indexRouter = require('./routes/index.route');

app.set("view engine", "ejs");
app.set("views", "src/views");

app.use(morgan("tiny"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/',indexRouter);
app.use("/users", userRouter);

module.exports = app;
