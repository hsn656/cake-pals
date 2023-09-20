const tryCatchWrapper = require("../helpers/tryCatchWrapper");
const { formatSuccessRespnse } = require("../helpers/formatResponse");
const productService = require("../services/product.service");

const create = tryCatchWrapper(async (req, res) => {
  const { name, preparationTime, price, type } = req.body;
  const result = await productService.create(
    {
      name,
      preparationTime,
      price,
      type,
    },
    req.user.id
  );
  return res.status(201).json(formatSuccessRespnse(result));
});

const update = tryCatchWrapper(async (req, res) => {
  const { name, preparationTime, price, type } = req.body;
  const result = await productService.update(
    req.params.id,
    {
      name,
      preparationTime,
      price,
      type,
    },
    req.user.id
  );
  return res.status(201).json(formatSuccessRespnse(result));
});

const remove = tryCatchWrapper(async (req, res) => {
  const result = await productService.remove(req.params.id, req.user.id);
  return res.status(201).json(formatSuccessRespnse(result));
});

module.exports = {
  create,
  update,
  remove,
};
