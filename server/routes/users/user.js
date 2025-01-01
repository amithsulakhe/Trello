const express = require("express");
const { getAllUsers } = require("../../controller/user/user");
const {
  checkUserAuthenticated,
} = require("../../services/common/commonfunction");

const router = express.Router();

router.route("/").post(checkUserAuthenticated, getAllUsers);

module.exports = router;
