const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      minlength: 6,
      maxlength: 40,
      unique: true,
      trim: true,
    },
    content: {
      type: String,
      minlength: 10,
      maxlength: 300,
      trim: true,
    },
  },
  { timestamps: true }
); // optional, adds createdAt/updatedAt

module.exports = mongoose.model("Post", postSchema);
