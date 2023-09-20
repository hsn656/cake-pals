const { RolesEnum } = require("../config/constants");
const userModel = require("../models.js/user.model");

const profile = async ({ id }) => {
  return await userModel.findOne({
    _id: id,
    role: RolesEnum.Seller,
  });
};

module.exports = {
  profile,
};
