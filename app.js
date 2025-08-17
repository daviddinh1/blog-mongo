require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./db/connectDb");
const routes = require("./routes/index");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", routes);

(async () => {
  try {
    await connectDB();
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`🚀 Server running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error("App failed to start due to DB error.");
    process.exit(1);
  }
})();
