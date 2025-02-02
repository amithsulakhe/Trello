const express = require("express");
const router = express.Router();

router.use("/auth/user", require("./auth"));

router.use("/user", require("./user"));

module.exports = router;
