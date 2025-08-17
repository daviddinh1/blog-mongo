const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");

//post req for creating a user
async function createUser(req, res, next) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      error: "error you did not pass in either username email or password",
    });
  }

  //hash password
  try {
    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({ username, email, passwordHash });
    const { _id, createdAt, updatedAt } = user;

    return res.status(201).json({ _id, username, email, createdAt, updatedAt });
  } catch (error) {
    return res
      .status(401)
      .json({ error: `A error in try block occurring error: ${error}` });
  }
}

//change this for multiple exports
module.exports = { createUser };
