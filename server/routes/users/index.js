const express = require("express");
const router = express.Router();

router.use("/auth/user", require("./auth"));

module.exports = router;
