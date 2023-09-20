const ApiError = require("../error/api-error");

const authorizeRoles = (...roles) => {
  return async (req, res, next) => {
    if (roles.includes(req.user.role)) next();
    else next(ApiError.forbidden("Permission Denied"));
  };
};
module.exports = { authorizeRoles };
