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

const DUMMY_HASH =
  "$2b$10$CwTycUXWue0Thq9StjUM0uJ8dJ2gPqEwF6zq6wVv8Qv5oQn1uYJfS";

async function logUser(req, res, next) {
  try {
    const { username, email, password } = req.body;

    if (!password || (!username && !email)) {
      return res
        .status(400)
        .json({ error: "Missing username/email or password." });
    }

    // Find by either username or email
    const query = username ? { username } : { email };

    // If passwordHash is select:false in your schema, add .select('+passwordHash')
    const user = await User.findOne(query).select("+passwordHash");

    // If no user, do a dummy compare to keep timing similar and return 401
    if (!user) {
      await bcrypt.compare(password, DUMMY_HASH);
      return res.status(401).json({ error: "Invalid credentials." });
    }

    // Compare the provided password to the stored hash
    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    // Success — never return passwordHash or other sensitive fields
    const { passwordHash, ...safeUser } = user.toObject();
    // TODO: issue a session/JWT here instead of just returning the user
    return res.status(200).json({ user: safeUser });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Something went wrong." });
  }
}
//change this for multiple exports
module.exports = { createUser, logUser };
