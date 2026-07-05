const Booking = require("../models/Booking");

async function createBooking(data) {
  return Booking.create(data);
}

async function getUserBookings(userId) {
  return Booking.find({ userId }).sort({ createdAt: -1 });
}

async function updateBooking(bookingId, updateData) {
  return Booking.findByIdAndUpdate(bookingId, updateData, { new: true });
}

async function deleteBooking(bookingId) {
  return Booking.findByIdAndDelete(bookingId);
}

module.exports = {
  createBooking,
  getUserBookings,
  updateBooking,
  deleteBooking,
};
