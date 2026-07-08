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

module.exports = {
  createBooking,

  getUserBookings,

  getBookingById,

  updateBooking,

  deleteBooking,
};
