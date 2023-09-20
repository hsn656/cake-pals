const express = require("express");
const router = express.Router();
const authRoutes = require('./auth.routes')

router.use("/auth", authRoutes);

router.get("/", (req, res, next) => {
    try {
      res.send('app is running');
    } catch (error) {
      next(error);
    }
});
  
module.exports = router;