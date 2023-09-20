const mongoose = require("mongoose");
const userModel = require("./user.model");
const { productTypesArray } = require("../config/constants");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    preparationTime: {
      type: Number,
    },
    price: {
      type: Number,
    },
    sellerId: {
      type: mongoose.Schema.ObjectId,
      ref: userModel.name,
    },
    type: {
        type: String, enum: productTypesArray
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
