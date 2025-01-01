const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const { responseHandler } = require("../../response/responseHandler");

const getUniqueUUID = () => {
  return uuidv4().replace(/-/gi, "");
};
const getUniqueBigINT = () => {
  return crypto.randomInt(1111111111, 9999999999);
};

const getUniqueINT = () => {
  return crypto.randomInt(111111111, 999999999);
};

function generateOtp(length) {
  if (length < 1) throw new Error("Length must be at least 1");

  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;

  const otp = crypto.randomInt(min, max + 1);
  return otp;
}

function isOtpExpired(otpTimestamp) {
  const otpGeneratedTime = new Date(otpTimestamp).getTime();
  const currentTime = new Date().getTime();
  const timeDifference = currentTime - otpGeneratedTime;

  return timeDifference > 10 * 60 * 1000;
}

const checkUserAuthenticated = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.SECRETKEY);
    if (user) {
      req.user = user;
      next();
    }
  } catch (error) {
    return responseHandler.unauthorized(req, res, {
      data: null,
      message: "Unauthorized access.",
    });
  }
};
module.exports = {
  getUniqueBigINT,
  getUniqueINT,
  getUniqueUUID,
  generateOtp,
  isOtpExpired,
  checkUserAuthenticated,
};
