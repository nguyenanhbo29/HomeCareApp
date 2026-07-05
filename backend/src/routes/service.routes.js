const express = require("express");

const {
  listServices,
  listPopularServices,
  listRecommendedServices,
  getService,
  seedServices,
} = require("../controllers/service.controller");

const router = express.Router();

router.get("/", listServices);

router.get("/popular", listPopularServices);

router.get("/recommended", listRecommendedServices);

router.get("/:id", getService);

router.post("/seed", seedServices);

module.exports = router;
