const mongoose = require("mongoose");
const express = require("express");

const authRouter = express.Router();

const { loginUser } = require("../controllers/userControllers");

authRouter.route("/").post(loginUser);

module.exports = authRouter;
