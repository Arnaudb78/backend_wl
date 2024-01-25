const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.getUser);

router.get("/:id", userController.getIdUser);

router.post("/insert", userController.postUser);

module.exports = router;
