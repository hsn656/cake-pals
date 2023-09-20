const moment = require("moment");

const { RolesEnum, OrderStatesEnum } = require("../config/constants");
const ApiError = require("../error/api-error");
const orderModel = require("../models.js/order.model");
const productModel = require("../models.js/product.model");
const userModel = require("../models.js/user.model");

const profile = async ({ id }) => {
  return await userModel.findOne({
    _id: id,
    role: RolesEnum.Seller,
  });
};


module.exports = {
  profile
};
