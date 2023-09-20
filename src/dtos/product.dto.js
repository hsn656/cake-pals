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

const listProductDto = {
  body: Joi.object({
    location: Joi.array().optional().items(Joi.number()).length(2),
    rangeInMeter: Joi.number().min(0).optional(),
    type: Joi.string()
      .optional()
      .valid(...productTypesArray),
  }),
};

module.exports = {
  createProductDto,
  updateProductDto,
  listProductDto,
};
