const express = require("express");
const userRoute = require("./userRoutes");
const postRoute = require("./postRoutes");
const router = express.Router();
//use this file to mount the main filepath to the routes
//this mounts the route to the route you created in testRoute

router.use("/user", userRoute);
router.use("/post", postRoute);

module.exports = router;
