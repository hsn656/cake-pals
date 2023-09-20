const mongoose = require("mongoose");
const userModel = require("./user.model");
const productModel = require("./product.model");
const { orderStatesArray, OrderStatesEnum } = require("../config/constants");

const orderSchema = new mongoose.Schema(
  {
    collectionTime: {
      type: Date,
    },
    productId: {
      type: mongoose.Schema.ObjectId,
      ref: productModel.name,
    },
    sellerId: {
      type: mongoose.Schema.ObjectId,
      ref: userModel.name,
    },
    buyerId: {
      type: mongoose.Schema.ObjectId,
      ref: userModel.name,
    },
    state: {
      type: String,
      enum: orderStatesArray,
      default: OrderStatesEnum.Pending,
    },
    rate: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
