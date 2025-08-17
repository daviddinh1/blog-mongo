require("dotenv").config();
const mongoose = require("mongoose");

let isConnected = false;

async function connectMongoose(uri = process.env.MONGODB_URI) {
  if (isConnected) {
    return mongoose.connection; //what does returning a connection do?
  }

  mongoose.set("strictQuery", true); //no more warnings about old shit

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      autoIndex: true, // good in dev; consider false in prod and create indexes manually
    });

    isConnected = true;
    console.log(
      "connection to mongoose is a success",
      mongoose.connection.name
    );

    // Helpful events
    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️  MongoDB disconnected");
      isConnected = false;
    });

    // Graceful shutdown
    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      console.log("🛑 MongoDB connection closed due to app termination");
      process.exit(0);
    });

    return mongoose.connection;
  } catch (error) {
    console.log(`connection to mongoose failed error is : ${error}`);
    console.log("the uri is: ", uri);
  }
}

module.exports = connectMongoose;
