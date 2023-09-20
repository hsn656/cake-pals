const { Joi } = require("express-validation");
const { productTypesArray } = require("../config/constants");

const createProductDto = {
  body: Joi.object({
    name: Joi.string().required(),
    preparationTime: Joi.number().min(0).required(),
    price: Joi.number().min(0).required(),
    type: Joi.string()
      .required()
      .valid(...productTypesArray),
  }),
};

const updateProductDto = {
  body: Joi.object({
    name: Joi.string().required(),
    preparationTime: Joi.number().min(0).required(),
    price: Joi.number().min(0).required(),
    type: Joi.string()
      .required()
      .valid(...productTypesArray),
  }),
};

module.exports = {
  createProductDto,
  updateProductDto
};
