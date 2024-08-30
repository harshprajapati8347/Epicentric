const express = require("express");
const router = express.Router();
const { isAuthenticated, isAdmin } = require("../middleware/auth");

const {
  getAllTickets,
  createTicketBooking,
  deleteAdminTicket,
  downloadTicket,
  refundBooking,
  getAllAdminTickets,
} = require("../controllers/bookingController");

// Get All Bookings
router.get(
  "/admin-get-all-tickets",
  isAuthenticated,
  isAdmin("admin"),
  getAllAdminTickets
);

// Get All User Tickets
router.get("/get-all-tickets", isAuthenticated, getAllTickets);

// Create a new booking
router.post("/", isAuthenticated, createTicketBooking);

// Cancel Booking
router.delete("/refund-ticket/:id", isAuthenticated, refundBooking);

// Delete a booking
router.delete(
  "/admin-delete-ticket/:id",
  isAuthenticated,
  isAdmin("admin"),
  deleteAdminTicket
);

module.exports = router;
