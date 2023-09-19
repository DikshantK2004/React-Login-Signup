const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/user");

const link = "mongodb+srv://dikkpsd:zksurt@users.s1qlvfq.mongodb.net/";

const app = express();
app.use(cors()); // for sending data from frontend to backend
// app.options('*', cors())
app.use(express.json()); // data using stringified json format
app.use(bodyParser.urlencoded({ extended: true })); // helps with sending requests in form-encode part

mongoose.connect(link).then(() => {
  console.log("connection is ready");
});
const port = 3001;

app.get("/", async (req, res) => {
  const userList = await User.find();
  res.send(userList);
});

app.post("/signup", async (req, res) => {
  const data = {
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  };

  let user = await User.findOne({ email: data.email });
  console.log(user);
  if (user) {
    res.send({
      alert: false,
      message: "User Already exists",
    });
  } else {
    let user_save = new User(data);
    user_save = await user_save.save();
    if (!user_save) {
      return res.send({
        message: "Can't Sign in",
        alert: false,
      });
    }
    res.send({
      message: "Signup Successful",
      alert: true,
    });
  }
});

app.get("/login/:email", async (req, res) => {
  const email = req.params.email;

  const user = await User.findOne({ email: email });

  if (user) {
    res.send({
      alert: true,
      message: "User Exists",
      data: user,
    });
  } else {
    return res.send({
      message: "Please Sign up",
      alert: false,
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
