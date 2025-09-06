const sendResponse = (res, statusCode, message, data = null, success = true) => {
  return res.status(statusCode).json({
    status: success ? "success" : "fail",
    success,
    message,
    results: Array.isArray(data) ? data.length : undefined,
    data,
  });
};

module.exports = sendResponse;