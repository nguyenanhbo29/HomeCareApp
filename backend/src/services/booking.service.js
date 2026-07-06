const Booking = require("../models/Booking");

/**
 * Create booking
 */
async function createBooking(data) {
  return await Booking.create(data);
}

/**
 * Get all bookings
 * Admin sử dụng
 */
async function getAllBookings() {
  return await Booking.find()
    .populate("user")
    .populate("service")
    .sort({ createdAt: -1 });
}

/**
 * Get booking by id
 */
async function getBookingById(id) {
  return await Booking.findById(id).populate("user").populate("service");
}

/**
 * Get bookings by user
 */
async function getUserBookings(userId) {
  return await Booking.find({ user: userId })
    .populate("service")
    .sort({ createdAt: -1 });
}

/**
 * Get bookings by status
 * Admin / Staff
 */
async function getBookingsByStatus(status) {
  return await Booking.find({ status })
    .populate("user")
    .populate("service")
    .sort({ createdAt: -1 });
}

/**
 * Update booking
 */
async function updateBooking(id, updateData) {
  return await Booking.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  })
    .populate("user")
    .populate("service");
}

/**
 * Delete booking
 */
async function deleteBooking(id) {
  return await Booking.findByIdAndDelete(id);
}

module.exports = {
  createBooking,

  getAllBookings,

  getBookingById,

  getUserBookings,

  getBookingsByStatus,

  updateBooking,

  deleteBooking,
};
