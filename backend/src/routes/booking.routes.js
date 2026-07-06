const express = require("express");

const {
  createBooking,
  getAllBookings,
  getBooking,
  getUserBookings,
  getBookingsByStatus,
  updateBooking,
  deleteBooking,
} = require("../controllers/booking.controller");

// const { authenticateToken } = require("../middleware/auth");

const router = express.Router();

/**
 * Require Login
 */
// router.use(authenticateToken);

/**
 * Create Booking
 */
router.post("/", createBooking);

/**
 * Get All Bookings (Admin)
 */
router.get("/", getAllBookings);

/**
 * Get Current User Bookings
 */
router.get("/user/:userId", getUserBookings);

/**
 * Filter Booking By Status
 */
router.get("/status/:status", getBookingsByStatus);

/**
 * Get Booking Detail
 */
router.get("/:id", getBooking);

/**
 * Update Booking
 */
router.put("/:id", updateBooking);

/**
 * Delete Booking
 */
router.delete("/:id", deleteBooking);

module.exports = router;
