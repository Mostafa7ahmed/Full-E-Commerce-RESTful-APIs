const sendResponse = (
  res,
  statusCode,
  message,
  data = null,
  extra = {}
) => {
  return res.status(statusCode).json({
    status: statusCode >= 200 && statusCode < 300 ? "success" : "fail",
    message,
    ...extra, 
    data,
  });
};

module.exports = sendResponse;