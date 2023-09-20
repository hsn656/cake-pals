const express = require("express");
const { validate } = require("express-validation");

const authController = require("../controllers/auth.controller");
const { registerDto, loginDto } = require("../dtos/auth.dto");
const { verifyToken } = require("../middlewares/verifyToken");

const router = express.Router();

router.post("/register", validate(registerDto), authController.register);
router.post("/login", validate(loginDto), authController.login);
router.get("/profile", verifyToken, authController.profile);

module.exports = router;
