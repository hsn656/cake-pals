const { Joi } = require("express-validation");

const createOrderDto = {
  body: Joi.object({
    collectionTime: Joi.date().required(),
    productId: Joi.string().required(),
  }),
};

module.exports = {
  createOrderDto,
};
