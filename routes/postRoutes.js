const express = require("express");
const postRoute = express.Router();
const { createPost } = require("../controllers/postController");

postRoute.post("/", createPost);
postRoute.get("/", (req, res) => res.send("POST route lives here"));

module.exports = postRoute;
