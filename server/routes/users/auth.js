const router = require("express").Router();

const authRoutes = require("../../controller/user/authentication");

router.route("/register").post(authRoutes.register);

router.route("/validate-otp").post(authRoutes.validateOtp);

router.route("/resend-otp").post(authRoutes.resendOtp);

module.exports = router;
