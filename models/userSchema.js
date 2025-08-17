const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      min: 5,
      max: 30,
      index: true,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      index: true,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    passwordHash: { type: String, required: true, select: false },
  },
  { timeStamps: true }
);

module.exports = mongoose.model("User", userSchema);
