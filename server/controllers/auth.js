import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";
const User = require("../models/user");
import jwt from "jsonwebtoken";

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  //form validation

  if (!name || !email || !password) {
    return res.status(400).send("Please put all the fields correctly");
  }

  // user check
  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).send("Email already Exists");
  }

  // hash the password
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create and put the user to the Database
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  // veryfy the user if that created susscessfully

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400).send("Invalid user Data");
  }
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.cookie("token", generateToken(user._id));

    user.password = undefined;

    res.status(200).json({
      user,
    });
  } else {
    res.status(400).send("Invalid Ceredtials");
  }
});

module.exports = {
  registerUser,
  loginUser,
};
