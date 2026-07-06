const bookingService = require("../services/booking.service");

/**
 * Create Booking
 */
async function createBooking(req, res) {
  try {
    const booking = await bookingService.createBooking(req.body);

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: booking,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

/**
 * Get All Bookings
 * Admin
 */
async function getAllBookings(req, res) {
  try {
    const bookings = await bookingService.getAllBookings();

    res.json({
      success: true,
      message: "Bookings fetched successfully",
      data: bookings,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

/**
 * Get Booking By Id
 */
async function getBooking(req, res) {
  try {
    const booking = await bookingService.getBookingById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.json({
      success: true,
      message: "Booking fetched successfully",
      data: booking,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

/**
 * Get User Bookings
 */
async function getUserBookings(req, res) {
  try {
    const bookings = await bookingService.getUserBookings(req.params.userId);

    res.json({
      success: true,
      message: "User bookings fetched successfully",
      data: bookings,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

/**
 * Get Bookings By Status
 */
async function getBookingsByStatus(req, res) {
  try {
    const bookings = await bookingService.getBookingsByStatus(
      req.params.status,
    );

    res.json({
      success: true,
      message: "Bookings fetched successfully",
      data: bookings,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
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
    const booking = await bookingService.updateBooking(req.params.id, req.body);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.json({
      success: true,
      message: "Booking updated successfully",
      data: booking,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
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
    const booking = await bookingService.deleteBooking(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.json({
      success: true,
      message: "Booking deleted successfully",
      data: booking,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = {
  createBooking,
  getAllBookings,
  getBooking,
  getUserBookings,
  getBookingsByStatus,
  updateBooking,
  deleteBooking,
};
