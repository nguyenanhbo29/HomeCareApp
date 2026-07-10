const express = require("express");
const { authenticateToken } = require("../middleware/auth");
const { listUsers, updateUserStatus } = require("../controllers/user.controller");

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

router.get("/", authenticateToken, isAdmin, listUsers);
router.put("/:id/status", authenticateToken, isAdmin, updateUserStatus);

module.exports = router;
