const asyncHandler = require("express-async-handler");
const User = require("../Models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter all the fields");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Failed to create user");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please enter all the fields");
  }

  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("Invalid email or password");
  }

  const isPasswordMatch = password === user.password;

  if (!isPasswordMatch) {
    res.status(400);
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token,
  });
});

const getUsers = asyncHandler(async (req, res) => {
  const searchTerm = req.query.search ? req.query.search.replace(/"/g, "") : "";

  const keyword = searchTerm
    ? {
        $or: [
          { name: { $regex: searchTerm, $options: "i" } },
          { email: { $regex: searchTerm, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword);
  console.log("Query object:", JSON.stringify(keyword, null, 2));
  res.json(users);
});

module.exports = { registerUser, loginUser, getUsers };
