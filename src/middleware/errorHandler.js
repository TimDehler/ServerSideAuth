const { VALIDATION_ERROR, UNAUTHORIZED, FORBIDDEN, NOT_FOUND, SERVER_ERROR } =
  require("../constants").constants;

const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  switch (statusCode) {
    case VALIDATION_ERROR:
      res.json({
        title: "VALIDATION_ERROR",
        message: error.message,
        stackTrace: error.stack,
      });
      break;

    case UNAUTHORIZED:
      res.json({
        title: "UNAUTHORIZED",
        message: error.message,
        stackTrace: error.stack,
      });
      break;

    case FORBIDDEN:
      res.json({
        title: "FORBIDDEN",
        message: error.message,
        stackTrace: error.stack,
      });
      break;

    case NOT_FOUND:
      res.json({
        title: "NOT_FOUND",
        message: error.message,
        stackTrace: error.stack,
      });
      break;

    case SERVER_ERROR:
      res.json({
        title: "SERVER_ERROR",
        message: error.message,
        stackTrace: error.stack,
      });
      break;

    default:
      console.log("No Error all good");
      break;
  }
};

module.exports = errorHandler;
