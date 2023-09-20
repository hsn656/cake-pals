const productModel = require("../models.js/product.model");

const create = async ({ name, preparationTime, price, type }, sellerId) => {
  return await productModel.create({
    name,
    preparationTime,
    price,
    sellerId,
    type,
  });
};

const update = async (id, { name, preparationTime, price, type }, sellerId) => {
  return await productModel.findOneAndUpdate(
    {
      _id: id,
      sellerId,
    },
    {
      name,
      preparationTime,
      price,
      sellerId,
      type,
    },
    {
      new: true,
    }
  );
};

const remove = async (id, sellerId) => {
  return await productModel.findOneAndDelete({
    _id: id,
    sellerId,
  });
};

module.exports = {
  create,
  update,
  remove
};
