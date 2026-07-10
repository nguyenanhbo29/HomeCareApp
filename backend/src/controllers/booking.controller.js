const bookingService = require("../services/booking.service");

/**
 * Create Booking
 */
async function createBooking(req, res) {
  try {
    const bookingData = {
      ...req.body,
      user: req.user.id,
    };

    const booking = await bookingService.createBooking(bookingData);

    return res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: booking,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

/**
 * Get Current User Bookings
 */
async function getUserBookings(req, res) {
  try {
    let bookings;
    if (req.user.role === "Admin") {
      bookings = await bookingService.getAllBookings();
    } else {
      bookings = await bookingService.getUserBookings(req.user.id);
    }

    return res.status(200).json({
      success: true,
      message: "Bookings fetched successfully",
      data: bookings,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

/**
 * Get Booking Detail
 */
async function getBooking(req, res) {
  try {
    let booking;
    if (req.user.role === "Admin") {
      booking = await bookingService.getBookingByIdAdmin(req.params.id);
    } else {
      booking = await bookingService.getBookingById(
        req.params.id,
        req.user.id,
      );
    }

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Booking fetched successfully",
      data: booking,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

/**
 * Update Booking
 */
async function updateBooking(req, res) {
  try {
    let booking;
    if (req.user.role === "Admin") {
      booking = await bookingService.updateBookingAdmin(
        req.params.id,
        req.body,
      );
    } else {
      booking = await bookingService.updateBooking(
        req.params.id,
        req.user.id,
        req.body,
      );
    }

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Booking updated successfully",
      data: booking,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

/**
 * Delete Booking
 */
async function deleteBooking(req, res) {
  try {
    const booking = await bookingService.deleteBooking(
      req.params.id,
      req.user.id,
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
      data: booking,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = {
  createBooking,
  getUserBookings,
  getBooking,
  updateBooking,
  deleteBooking,
};
