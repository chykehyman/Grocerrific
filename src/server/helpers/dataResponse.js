export default {
  success(response, statusCode, message, payload) {
    response.status(statusCode).json({
      message,
      payload
    });
  },

  error(response, statusCode, message) {
    response.status(statusCode).json({
      message
    });
  }
};
