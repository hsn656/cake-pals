const { formatErrorRespnse } = require("../helpers/formatResponse");
const { logger } = require("../Logger");

function apiErrorHandler(err, req, res, next) {
  logger.error(err.message);
  const error = {
    statusCode: err.code || err.statusCode || 500,
    message: err.message || 'something went wrong',
  };
  return res.status(error.statusCode).json(formatErrorRespnse(error.message, err?.details || []));
}

module.exports = apiErrorHandler;
