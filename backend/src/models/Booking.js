const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },

    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },

    bookingDate: {
      type: Date,
      required: true,
    },

    bookingTime: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    note: {
      type: String,
      default: "",
    },

    totalPrice: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
      default: "Pending",
    },

    paymentStatus: {
      type: String,
      enum: ["Unpaid", "Paid"],
      default: "Unpaid",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Booking", bookingSchema);
