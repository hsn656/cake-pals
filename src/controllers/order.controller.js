const tryCatchWrapper = require("../helpers/tryCatchWrapper");
const { formatSuccessRespnse } = require("../helpers/formatResponse");
const orderService = require("../services/order.service");

const createOrder = tryCatchWrapper(async (req, res) => {
  const { collectionTime, productId } = req.body;
  const result = await orderService.createOrder(
    {
      collectionTime,
      productId,
    },
    req.user.id
  );
  return res.status(201).json(formatSuccessRespnse(result));
});

const acceptOrder = tryCatchWrapper(async (req, res) => {
  const result = await orderService.acceptOrder(
    {
      orderId: req.params.id,
    },
    req.user.id
  );
  return res.status(200).json(formatSuccessRespnse(result));
});

const rejectOrder = tryCatchWrapper(async (req, res) => {
  const result = await orderService.rejectOrder(
    {
      orderId: req.params.id,
    },
    req.user.id
  );
  return res.status(200).json(formatSuccessRespnse(result));
});

const fulfillOrder = tryCatchWrapper(async (req, res) => {
  const result = await orderService.fulfillOrder(
    {
      orderId: req.params.id,
    },
    req.user.id
  );
  return res.status(200).json(formatSuccessRespnse(result));
});

const rateOrder = tryCatchWrapper(async (req, res) => {
  const { rating } = req.body;
  const result = await orderService.rateOrder(
    {
      orderId: req.params.id,
      rating,
    },
    req.user.id
  );
  return res.status(200).json(formatSuccessRespnse(result));
});

module.exports = {
  createOrder,
  acceptOrder,
  rejectOrder,
  fulfillOrder,
  rateOrder,
};
