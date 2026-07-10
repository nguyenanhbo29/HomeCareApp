const express = require("express");

const {
  listServices,
  listPopularServices,
  listRecommendedServices,
  getService,
  seedServices,
  createService,
  updateService,
  deleteService,
} = require("../controllers/service.controller");
const { authenticateToken } = require("../middleware/auth");

const router = express.Router();

// Middleware to authorize only Admins
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "Admin") {
    return next();
  }
  return res.status(403).json({
    success: false,
    message: "Access denied. Admin role required.",
  });
};

router.get("/", listServices);

router.get("/popular", listPopularServices);

router.get("/recommended", listRecommendedServices);

router.get("/:id", getService);

router.post("/seed", seedServices);

// Admin routes
router.post("/", authenticateToken, isAdmin, createService);
router.put("/:id", authenticateToken, isAdmin, updateService);
router.delete("/:id", authenticateToken, isAdmin, deleteService);

module.exports = router;
