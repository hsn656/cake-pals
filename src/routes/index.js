const express = require("express");
const router = express.Router();
const authRoutes = require('./auth.routes')
const productRoutes = require('./product.routes')
const bakerRoutes = require('./baker.routes')
const orderRoutes = require('./order.routes')


router.use("/auth", authRoutes);
router.use("/products", productRoutes);
router.use("/bakers", bakerRoutes);
router.use("/orders", orderRoutes);


router.get("/", (req, res, next) => {
    try {
      res.send('app is running');
    } catch (error) {
      next(error);
    }
});
  
module.exports = router;