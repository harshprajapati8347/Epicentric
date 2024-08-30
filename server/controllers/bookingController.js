const Booking = require("../model/bookingSchema");
const asyncHandler = require("express-async-handler");
const fs = require("fs");

// Get All User Tickets
const getAllTickets = asyncHandler(async (req, res) => {
  try {
    const all_tickets = await Booking.find({}).sort({ createdAt: -1 });

    const tickets = all_tickets.filter(
      (ticket) => ticket.user._id.toString() === req.user._id.toString()
    );

    res.status(200).json(tickets);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

// Get All Admin Tickets
const getAllAdminTickets = asyncHandler(async (req, res) => {
  try {
    const tickets = await Booking.find({}).sort({ createdAt: -1 });
    res.status(200).json(tickets);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

// Create a new booking
const createTicketBooking = asyncHandler(async (req, res) => {
  try {
    const { tickets, event, user, totalPrice, paymentId } = req.body;

    const booking = new Booking({
      tickets,
      event,
      user,
      totalPrice,
      paymentId,
    });

    const createdBooking = await booking.save();

    res.status(201).json({
      success: true,
      data: createdBooking,
    });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

// Cancel Booking - User
const refundBooking = asyncHandler(async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (booking) {
      await Booking.findByIdAndDelete(req.params.id);
      res.json({
        success: true,
        message: "Ticket removed",
      });
    } else {
      res.status(404);
      throw new Error("Ticket not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Unable to delete a ticket, please try again",
    });
  }
});

// Admin: Delete a booking
const deleteAdminTicket = asyncHandler(async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    console.log(req.params.id);
    if (booking) {
      await Booking.findByIdAndDelete(req.params.id);
      res.json({
        success: true,
        message: "Ticket removed",
      });
    } else {
      res.status(404);
      throw new Error("Ticket not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Unable to delete a ticket, please try again",
    });
  }
});

// Download ticket

const downloadTicket = asyncHandler(async (req, res) => {
  try {
    const booking = await Booking.findById(req.body.bookingId).populate(
      "user",
      "name email"
    );
    if (!booking) {
      res.status(404);
      throw new Error("Booking not found");
    }
    const pdf = new PDFDocument();
    pdf.pipe(
      fs.createWriteStream(`
    ${__dirname}/../client/public/tickets/${booking._id}.pdf`)
    );
    pdf.fontSize(26).text("Ticket", {
      underline: true,
    });
    pdf.text(`Event: ${booking.event.name}`);
    pdf.text(`User: ${booking.user.firstName} ${booking.user.lastName}`);
    pdf.text(`Email: ${booking.user.email}`);
    pdf.text(`Price: ${booking.totalPrice}`);
    pdf.end();
    res.status(200).json({
      success: true,
      message: "Ticket downloaded",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Unable to download ticket",
    });
  }
});

module.exports = {
  createTicketBooking,
  getAllTickets,
  getAllAdminTickets,
  deleteAdminTicket,
  downloadTicket,
  refundBooking,
};
