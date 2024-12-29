const db = require("../../db/sequalize/models/index");
const crypto = require("crypto");
const { responseHandler } = require("../../response/responseHandler");
const {
  getUniqueBigINT,
  getUniqueINT,
  getUniqueUUID,
  generateOtp,
} = require("../../services/common/commonfunction");
const { sendEmailMail } = require("../../nodemailer/email");

const register = async (req, res) => {
  const trans = await db.sequelize.transaction();
  try {
    // Example usage
    const dataToCreate = { ...(req.body || {}) };

    const isEmailAlreadyExisted = await db.users.findOne({
      where: {
        email: dataToCreate.email,
      },
    });

    if (isEmailAlreadyExisted) {
      return responseHandler.failure(req, res, "Email already existed");
    }

    const id_str = getUniqueUUID();

    const data = {
      ...dataToCreate,
      id_str,
    };
    const createdData = await db.users.create(data, {
      transaction: trans,
    });

    const otp = generateOtp(6);

    const registerVerification = await db.registerVerification.create(
      {
        uid: createdData.id,
        ver_code: otp,
        isverified: false,
        addedBy: createdData.id,
      },
      {
        transaction: trans,
      }
    );

    const obj = {
      email: createdData.email,
      template: "/views/email/otp",
      subject: "Your Otp",
      data: {
        code: otp,
        username: `${createdData.firstName} ${createdData.lastName}`,
      },
    };

    await sendEmailMail(obj);

    await trans.commit();
    return responseHandler.success(req, res, {
      data: createdData,
      message: "Otp Sent successfully",
    });
  } catch (error) {
    await trans.rollback();
    return responseHandler.failure(req, res, error);
  }
};

module.exports = {
  register,
};
