const bookingService = require("../services/booking.service");
const User = require("../models/User");
const Booking = require("../models/Booking");

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

async function getAdminStats(req, res) {
  try {
    const bookings = await Booking.find({}).populate("service");
    
    // 1. Thống kê tổng quan
    const totalBookings = bookings.length;
    const pendingBookings = bookings.filter(b => b.status === "Pending").length;
    
    const totalRevenue = bookings
      .filter(b => b.status === "Completed" || b.paymentStatus === "Paid")
      .reduce((sum, b) => sum + b.totalPrice, 0);

    // 2. Thống kê doanh thu theo tháng (năm hiện tại)
    const currentYear = new Date().getFullYear();
    const monthlyRevenue = Array(12).fill(0); // Doanh thu tháng 1 đến 12

    bookings.forEach(b => {
      if (b.status === "Completed" || b.paymentStatus === "Paid") {
        const date = new Date(b.bookingDate);
        if (date.getFullYear() === currentYear) {
          const month = date.getMonth(); // 0-11
          monthlyRevenue[month] += b.totalPrice;
        }
      }
    });

    // 3. Top dịch vụ được đặt nhiều nhất
    const serviceCounts = {};
    bookings.forEach(b => {
      if (b.service) {
        const serviceId = b.service._id.toString();
        if (!serviceCounts[serviceId]) {
          serviceCounts[serviceId] = {
            name: b.service.name,
            count: 0,
            revenue: 0
          };
        }
        serviceCounts[serviceId].count += 1;
        if (b.status === "Completed" || b.paymentStatus === "Paid") {
          serviceCounts[serviceId].revenue += b.totalPrice;
        }
      }
    });

    const topServices = Object.values(serviceCounts)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // 4. Số khách hàng mới trong tháng hiện tại
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const newCustomersCount = await User.countDocuments({
      createdAt: { $gte: startOfMonth },
      role: "Customer"
    });

    return res.status(200).json({
      success: true,
      data: {
        totalBookings,
        pendingBookings,
        totalRevenue,
        monthlyRevenue,
        topServices,
        newCustomersCount
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to load admin statistics"
    });
  }
}

module.exports = {
  createBooking,
  getUserBookings,
  getBooking,
  updateBooking,
  deleteBooking,
  getAdminStats,
};
