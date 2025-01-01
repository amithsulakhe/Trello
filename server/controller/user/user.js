const db = require("../../db/sequalize/models");
const { responseHandler } = require("../../response/responseHandler");

const getAllUsers = async (req, res) => {
  try {
    console.log(req.user);

    const payload = { ...(req.body || {}) };

    const data = await db.users.findAll();

    // console.log(data);

    return responseHandler.success(req, res, {
      data: data,
      message: "Successfully Executed",
    });
  } catch (error) {
    return responseHandler.internalServerError(req, res, {
      data: null,
      error,
    });
  }
};

module.exports = {
  getAllUsers,
};
