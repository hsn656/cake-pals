const express = require("express");

const bakerController = require("../controllers/baker.controller");

const router = express.Router();

router.get("/:id", bakerController.profile);

module.exports = router;
