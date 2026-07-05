const express = require("express");
const {
  listPopularServices,
  listRecommendedServices,
  listServices,
  getService,
} = require("../controllers/service.controller");

const router = express.Router();

router.get("/popular", listPopularServices);
router.get("/recommended", listRecommendedServices);
router.get("/", listServices);
router.get("/:id", getService);

module.exports = router;
