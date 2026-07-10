const Booking = require("../models/Booking");

/**
 * Create Booking
 */
async function createBooking(data) {
  return await Booking.create(data);
}

/**
 * Get Current User Bookings
 */
async function getUserBookings(userId) {
  return await Booking.find({
    user: userId,
  })
    .populate("service")
    .sort({
      createdAt: -1,
    });
}

/**
 * Get Booking Detail
 * Only owner can view
 */
async function getBookingById(id, userId) {
  return await Booking.findOne({
    _id: id,
    user: userId,
  }).populate("service");
}

/**
 * Update Booking
 * Only owner can update
 */
async function updateBooking(id, userId, updateData) {
  return await Booking.findOneAndUpdate(
    {
      _id: id,
      user: userId,
    },
    updateData,
    {
      new: true,
      runValidators: true,
    },
  ).populate("service");
}

/**
 * Delete Booking
 * Only owner can delete
 */
async function deleteBooking(id, userId) {
  return await Booking.findOneAndDelete({
    _id: id,
    user: userId,
  });
}

/**
 * Get All Bookings (Admin)
 */
async function getAllBookings() {
  return await Booking.find({})
    .populate("service")
    .populate("user", "fullName email phone")
    .sort({
      createdAt: -1,
    });
}

/**
 * Get Booking Detail By Admin
 */
async function getBookingByIdAdmin(id) {
  return await Booking.findById(id)
    .populate("service")
    .populate("user", "fullName email phone");
}

/**
 * Update Booking By Admin
 */
async function updateBookingAdmin(id, updateData) {
  return await Booking.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  })
    .populate("service")
    .populate("user", "fullName email phone");
}

module.exports = {
  createBooking,

  getUserBookings,

  getBookingById,

  updateBooking,

  deleteBooking,

  getAllBookings,

  getBookingByIdAdmin,

  updateBookingAdmin,
};
