const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  tickets: {
    type: Array,
  },
  event: {
    type: Object,
  },
  user: {
    type: Object,
  },
  totalPrice: {
    type: Number,
  },
  paymentId: {
    type: String,
  },
  paymentInfo: {
    id: {
      type: String,
    },
    status: {
      type: String,
    },
    type: {
      type: String,
    },
  },
  paidAt: {
    type: Date,
    default: Date.now(),
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Booking", bookingSchema);
