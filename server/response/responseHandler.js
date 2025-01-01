const statusCode = require("./statusCodes");

// response handler

const responseHandler = {
  success: (req, res, data) => {
    return res.status(statusCode.success).json({
      success: true,
      message: "Request processed successfully.",
      data,
    });
  },
  created: (req, res, data) => {
    return res.status(statusCode.created).json({
      success: true,
      data,
    });
  },
  failure: (req, res, data) => {
    return res.status(statusCode.badRequest).json({
      success: true,
      data,
    });
  },
  noContent: (req, res) => {
    return res.status(statusCode.noContent).json({
      success: true,
      message: "No content to display.",
    });
  },
  badRequest: (req, res, message = "Invalid request parameters.") => {
    return res.status(statusCode.badRequest).json({
      success: false,
      message,
      data: null,
    });
  },
  unauthorized: (req, res, data) => {
    return res.status(statusCode.unauthorized).json({
      success: false,
      data,
    });
  },
  forbidden: (req, res, message = "Access is forbidden.") => {
    return res.status(statusCode.forbidden).json({
      success: false,
      message,
      data: null,
    });
  },
  notFound: (req, res, message = "Requested resource not found.") => {
    return res.status(statusCode.notFound).json({
      success: false,
      message,
      data: null,
    });
  },
  conflict: (
    req,
    res,
    message = "Conflict occurred with the current state."
  ) => {
    return res.status(statusCode.conflict).json({
      success: false,
      message,
      data: null,
    });
  },
  unprocessableEntity: (
    req,
    res,
    message = "The request was well-formed but could not be processed."
  ) => {
    return res.status(statusCode.unprocessableEntity).json({
      success: false,
      message,
      data: null,
    });
  },
  internalServerError: (req, res, data) => {
    return res.status(statusCode.internalServerError).json({
      success: false,
      data,
    });
  },
  serviceUnavailable: (
    req,
    res,
    message = "The service is temporarily unavailable."
  ) => {
    return res.status(statusCode.serviceUnavailable).json({
      success: false,
      message,
      data: null,
    });
  },
};

module.exports = {
  responseHandler,
};
