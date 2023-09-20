const { Joi } = require("express-validation");

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

module.exports = {
  createOrderDto,
  rateOrderDto,
};
