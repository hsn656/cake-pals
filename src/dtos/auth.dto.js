const { Joi } = require("express-validation");
const { rolesArray } = require("../config/constants");

const registerDto = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string()
      .required()
      .valid(...rolesArray),
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
