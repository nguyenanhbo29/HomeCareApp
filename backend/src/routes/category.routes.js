const express = require("express");
const categoryController = require("../controllers/category.controller");

const router = express.Router();

router.get("/", categoryController.getCategories);

router.post("/seed", categoryController.seedCategories);

module.exports = router;
