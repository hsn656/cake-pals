const express = require("express");

const orderController = require("../controllers/order.controller");
const { createOrderDto, rateOrderDto } = require("../dtos/order.dto");
const { validate } = require("express-validation");
const { verifyToken } = require("../middlewares/verifyToken");
const { authorizeRoles } = require("../helpers/authorizeRoles");
const { RolesEnum } = require("../config/constants");

const router = express.Router();

router.post(
  "/",
  validate(createOrderDto),
  verifyToken,
  orderController.createOrder
);

router.patch(
  "/:id/accept",
  verifyToken,
  authorizeRoles(RolesEnum.Seller),
  orderController.acceptOrder
);

router.patch(
  "/:id/reject",
  verifyToken,
  authorizeRoles(RolesEnum.Seller),
  orderController.rejectOrder
);

router.patch(
  "/:id/fulfill",
  verifyToken,
  authorizeRoles(RolesEnum.Seller),
  orderController.fulfillOrder
);

router.patch(
  "/:id/rate",
  validate(rateOrderDto),
  verifyToken,
  orderController.rateOrder
);

module.exports = router;
