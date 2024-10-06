const mongoose = require("mongoose");
const express = require("express");

const userRouter = express.Router();

const { registerUser, getUsers } = require("../controllers/userControllers");

userRouter.route("/").post(registerUser).get(getUsers);

module.exports = userRouter;
