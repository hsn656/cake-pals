const express = require("express");
const { validate } = require("express-validation");

const productController = require("../controllers/product.controller");
const { verifyToken } = require("../middlewares/verifyToken");
const { createProductDto, updateProductDto, listProductDto } = require("../dtos/product.dto");
const { authorizeRoles } = require("../helpers/authorizeRoles");
const { RolesEnum } = require("../config/constants");

const router = express.Router();

router.post("/list", validate(listProductDto), productController.list);

router.post(
  "/",
  validate(createProductDto),
  verifyToken,
  authorizeRoles(RolesEnum.Seller),
  productController.create
);

router.patch(
  "/:id",
  validate(updateProductDto),
  verifyToken,
  authorizeRoles(RolesEnum.Seller),
  productController.update
);

router.delete(
  "/:id",
  verifyToken,
  authorizeRoles(RolesEnum.Seller),
  productController.remove
);

module.exports = router;
