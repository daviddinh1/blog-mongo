const mongoose = require("mongoose");
const Post = require("../models/postSchema");
const User = require("../models/userSchema"); // if you want to verify existence

async function createPost(req, res) {
  const { title, content, userId } = req.body;

  if (!userId) return res.status(400).json({ error: "Please log in!" });
  if (!title || !content)
    return res.status(400).json({ error: "Missing title or content." });

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "Invalid user id." });
  }

  try {
    // Optional: ensure user exists
    const exists = await User.exists({ _id: userId });
    if (!exists) return res.status(404).json({ error: "User not found." });

    const post = await Post.create({ author: userId, title, content });
    return res.status(201).json({ post });
  } catch (err) {
    if (err && err.code === 11000) {
      return res.status(409).json({ error: "Title already exists." });
    }
    console.error("Create post error:", err);
    return res.status(500).json({ error: "Failed to create post." });
  }
}

module.exports = { createPost };
