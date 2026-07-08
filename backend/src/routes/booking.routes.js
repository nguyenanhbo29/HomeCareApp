const express = require("express");

const {
  createBooking,
  getBooking,
  getUserBookings,
  updateBooking,
  deleteBooking,
} = require("../controllers/booking.controller");

const { authenticateToken } = require("../middleware/auth");

const router = express.Router();

/**
 * Require Login
 */
router.use(authenticateToken);

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
