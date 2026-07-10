const express = require("express");

const {
  createBooking,
  getBooking,
  getUserBookings,
  updateBooking,
  deleteBooking,
  getAdminStats,
} = require("../controllers/booking.controller");

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

/**
 * Require Login
 */
router.use(authenticateToken);

/**
 * Admin Stats
 */
router.get("/admin/stats", isAdmin, getAdminStats);

/**
 * Create Booking
 */
router.post("/", createBooking);

/**
 * Current User Bookings
 */
router.get("/", getUserBookings);

/**
 * Booking Detail
 */
router.get("/:id", getBooking);

/**
 * Update Booking
 */
router.put("/:id", updateBooking);

/**
 * Cancel Booking
 */
router.delete("/:id", deleteBooking);

module.exports = router;
