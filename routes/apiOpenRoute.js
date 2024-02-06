const express = require("express");
const router = express.Router();
const openController = require("../controllers/openController");

router.post("/coords", openController.saveLoc);

module.exports = router;
