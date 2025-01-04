const jwt = require("jsonwebtoken");
const { responseHandler } = require("../response/responseHandler");

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
  checkUserAuthenticated,
};
