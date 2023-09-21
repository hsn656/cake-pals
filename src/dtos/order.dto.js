const { Joi } = require("express-validation");
const { orderStatesArray } = require("../config/constants");

const createOrderDto = {
  body: Joi.object({
    collectionTime: Joi.date().required(),
    productId: Joi.string().required(),
  }),
};

const rateOrderDto = {
  body: Joi.object({
    rating: Joi.number().min(0).max(5).required(),
  }),
};

const listOrdersDto = {
  body: Joi.object({
    state: Joi.string()
      .optional()
      .valid(...orderStatesArray),
  }),
};

module.exports = {
  createOrderDto,
  rateOrderDto,
  listOrdersDto,
};
