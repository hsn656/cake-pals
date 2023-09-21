const moment = require("moment");
const productModel = require("../models.js/product.model");
const userModel = require("../models.js/user.model");
const ApiError = require("../error/api-error");
const orderModel = require("../models.js/order.model");
const { OrderStatesEnum } = require("../config/constants");

const createOrder = async ({ collectionTime, productId }, buyerId) => {
  const product = await productModel.findById(productId);
  const seller = await userModel.findById(product.sellerId);
  if (seller.availableFrom < new Date()) seller.availableFrom = new Date();
  const nextAvailableTime = moment(seller.availableFrom).add(
    product.preparationTime,
    "hours"
  );
  if (nextAvailableTime.isAfter(moment(collectionTime)))
    throw ApiError.badRequest("baker is not available");
  return await orderModel.create({
    buyerId,
    collectionTime,
    productId,
    sellerId: seller._id,
  });
};

const acceptOrder = async ({ orderId }, sellerId) => {
  const order = await orderModel.findOne({
    _id: orderId,
    sellerId,
    state: OrderStatesEnum.Pending,
  });
  if (!order) throw ApiError.notFound();
  const product = await productModel.findById(order.productId);
  const seller = await userModel.findById(sellerId);
  if (seller.availableFrom < new Date()) seller.availableFrom = new Date();
  const nextAvailableTime = moment(seller.availableFrom).add(
    product.preparationTime,
    "hours"
  );
  if (nextAvailableTime.isAfter(moment(order.collectionTime)))
    throw ApiError.badRequest("not available");

  seller.availableFrom = nextAvailableTime.toDate();
  await seller.save();

  order.state = OrderStatesEnum.Accepted;
  return await order.save();
};

const rejectOrder = async ({ orderId }, sellerId) => {
  return await orderModel.findOneAndUpdate(
    {
      _id: orderId,
      sellerId,
      state: OrderStatesEnum.Pending,
    },
    {
      $set: {
        state: OrderStatesEnum.Rejected,
      },
    },
    {
      new: true,
    }
  );
};

const fulfillOrder = async ({ orderId }, sellerId) => {
  return await orderModel.findOneAndUpdate(
    {
      _id: orderId,
      sellerId,
      state: OrderStatesEnum.Accepted,
    },
    {
      $set: {
        state: OrderStatesEnum.Fulfilled,
      },
    },
    {
      new: true,
    }
  );
};

const rateOrder = async ({ orderId, rating }, buyerId) => {
  const order = await orderModel.findOne({
    _id: orderId,
    buyerId,
    state: OrderStatesEnum.Fulfilled,
  });

  if (!order) throw ApiError.notFound();
  if (order.rate !== undefined)
    throw ApiError.badRequest("you have already rated this order");

  const seller = await userModel.findById(order.sellerId);

  seller.overAllRating =
    (seller.overAllRating * seller.ratings.length + rating) /
    (seller.ratings.length + 1);
  seller.ratings.push({
    rate: rating,
    user: buyerId,
  });

  order.rate = rating;
  await order.save();
  return await seller.save();
};

const listOrders = async ({ state }, sellerId) => {
  return await orderModel
    .find({
      sellerId,
      ...(state && { state }),
    })
    .sort({ createdAt: -1 });
};

module.exports = {
  createOrder,
  acceptOrder,
  rejectOrder,
  fulfillOrder,
  rateOrder,
  listOrders,
};
