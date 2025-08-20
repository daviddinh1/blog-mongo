const express = require("express");
const userRoute = express.Router();
const { createUser, logUser } = require("../controllers/userController");

userRoute.post("/", createUser);
userRoute.get("/", logUser);

module.exports = userRoute;
