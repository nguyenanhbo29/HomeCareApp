const {
  createBooking,
  getUserBookings,
  updateBooking,
  deleteBooking,
} = require("../services/booking.service");

async function create(req, res) {
  try {
    const booking = await createBooking({
      ...req.body,
      userId: req.user.id,
    });

    return res.status(201).json(booking);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

async function list(req, res) {
  try {
    const bookings = await getUserBookings(req.user.id);
    return res.status(200).json(bookings);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function update(req, res) {
  try {
    const booking = await updateBooking(req.params.id, req.body);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    return res.status(200).json(booking);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

async function remove(req, res) {
  try {
    const booking = await deleteBooking(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    return res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = {
  create,
  list,
  update,
  remove,
};
