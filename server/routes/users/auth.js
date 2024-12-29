const router = require("express").Router();

const authRoutes = require("../../controller/user/authentication");

router.route("/register").post(authRoutes.register);

module.exports = router;
