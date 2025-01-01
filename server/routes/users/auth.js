const router = require("express").Router();

const authRoutes = require("../../controller/user/authentication");
const {
  checkUserAuthenticated,
} = require("../../services/common/commonfunction");

router.route("/register").post(authRoutes.register);

router.route("/validate-otp").post(authRoutes.validateOtp);

router.route("/resend-otp").post(authRoutes.resendOtp);

router.route("/login").post(authRoutes.login);

router.route("/me").get(checkUserAuthenticated, authRoutes.getUserInfo);

module.exports = router;
