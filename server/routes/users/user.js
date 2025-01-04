const express = require("express");
const { getAllUsers } = require("../../controller/user/user");
const {
  checkUserAuthenticated,
} = require("../../middlewares/check-user-session");

const router = express.Router();

router.route("/").post(checkUserAuthenticated, getAllUsers);

module.exports = router;
