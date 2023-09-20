const express = require("express");
const router = express.Router();
const authRoutes = require('./auth.routes')
const productRoutes = require('./product.routes')


router.use("/auth", authRoutes);
router.use("/product", productRoutes);


router.get("/", (req, res, next) => {
    try {
      res.send('app is running');
    } catch (error) {
      next(error);
    }
});
  
module.exports = router;