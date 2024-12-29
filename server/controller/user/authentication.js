const db = require("../../db/sequalize/models/index");
const crypto = require("crypto");
const { responseHandler } = require("../../response/responseHandler");
const {
  getUniqueBigINT,
  getUniqueINT,
  getUniqueUUID,
  generateOtp,
  isOtpExpired,
} = require("../../services/common/commonfunction");
const {
  sendEmailMailForOtp,
  sendEmailMailVerified,
} = require("../../nodemailer/email");

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

    await sendEmailMailForOtp(obj);

    await trans.commit();
    return responseHandler.success(req, res, {
      data: createdData,
      message: "Otp Sent successfully",
    });
  } catch (error) {
    await trans.rollback();
    return responseHandler.internalServerError(req, res, {
      data: null,
      message: "Internal Server error",
    });
  }
};

const validateOtp = async (req, res) => {
  try {
    const dataToCreate = { ...(req.body || {}) };

    const isUser = await db.users.findOne({
      where: {
        email: dataToCreate.email,
      },
    });
    if (!isUser) {
      return responseHandler.failure(req, res, {
        data: null,
        message: "User not existed",
      });
    }

    const userSettings = await db.registerVerification.findOne({
      where: {
        uid: isUser.id,
        isActive: true,
      },
    });

    if (userSettings.ver_code === dataToCreate.otp) {
      if (isOtpExpired(userSettings.createdAt)) {
        return responseHandler.failure(req, res, {
          data: null,
          message: "Otp is Expired or Invalid",
        });
      }

      const updatedUser = await db.users.update(
        { isverified: true },
        {
          where: {
            id: isUser.id,
          },
        }
      );
      const updateSettings = await db.registerVerification.update(
        { isverified: true },
        {
          where: {
            uid: isUser.id,
            isActive: true,
          },
        }
      );

      // send to mail otp verified successfully
      const obj = {
        email: isUser.email,
        template: "/views/email/otp",
        subject: "Your Verification",
        data: {
          username: `${isUser.firstName} ${isUser.lastName}`,
        },
      };

      await sendEmailMailVerified(obj);

      return responseHandler.success(req, res, {
        data: updatedUser,
        message: "Verified Successfully",
      });
    }

    return responseHandler.failure(req, res, {
      data: null,
      message: "Invalid Otp",
    });
  } catch (error) {
    return responseHandler.internalServerError(req, res, {
      data: null,
      message: "Internal Server error",
    });
  }
};

const resendOtp = async (req, res) => {
  try {
    const dataToCreate = { ...(req.body || {}) };

    const isUser = await db.users.findOne({
      where: {
        email: dataToCreate.email,
      },
    });
    if (!isUser) {
      return responseHandler.failure(req, res, {
        data: null,
        message: "User not existed",
      });
    }

    await db.registerVerification.update(
      {
        isActive: false,
      },
      {
        where: {
          uid: isUser.id,
          isActive: true,
        },
      }
    );

    const otp = generateOtp(6);

    const registerVerification = await db.registerVerification.create({
      uid: isUser.id,
      ver_code: otp,
      isverified: false,
      addedBy: isUser.id,
    });

    const obj = {
      email: isUser.email,
      template: "/views/email/otp",
      subject: "Your Otp",
      data: {
        code: otp,
        username: `${isUser.firstName} ${isUser.lastName}`,
      },
    };

    await sendEmailMailForOtp(obj);

    return responseHandler.success(req, res, {
      data: isUser,
      message: "Otp ReSent successfully",
    });
  } catch (error) {
    return responseHandler.internalServerError(req, res, {
      data: null,
      message: "Internal Server error",
    });
  }
};

module.exports = {
  register,
  validateOtp,
  resendOtp,
};
