const { RolesEnum } = require("../config/constants");
const productModel = require("../models.js/product.model");
const userModel = require("../models.js/user.model");

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

const list = async ({ location, rangeInMeter, type }) => {
  let sellerIds;
  if (location) {
    sellerIds = await userModel.distinct("_id", {
      role: RolesEnum.Seller,
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: location.reverse(),
          },
          $maxDistance: rangeInMeter || 10000,
        },
      },
    });
  }
  return await productModel.find({
    ...(sellerIds && { sellerId: { $in: sellerIds } }),
    ...(type && { type }),
  });
};

module.exports = {
  create,
  update,
  remove,
  list,
};
