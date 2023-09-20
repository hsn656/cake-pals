const { Joi } = require("express-validation");
const { rolesArray, RolesEnum } = require("../config/constants");

const registerDto = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string()
      .required()
      .valid(...rolesArray),
    location: Joi.when("role", {
      is: RolesEnum.Seller,
      then: Joi.array().required().items(Joi.number()).length(2),
      otherwise: Joi.forbidden(),
    }),
  }),
};

const loginDto = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

module.exports = {
  registerDto,
  loginDto,
};
