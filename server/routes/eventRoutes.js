const express = require("express");
const {
  getEvents,
  getEventById,
  createEvent,
  exampleAction,
  getUserEvents,
  updateEvent,
  getAlleventsAdmin,
  deleteEvent,
  deleteSingleEventAdmin,
  bookedTicketsUpdate,
} = require("../controllers/eventController");
const { upload } = require("../multer");
const router = express.Router();
const { isAuthenticated, isAdmin } = require("../middleware/auth");

const uploadFields = upload.fields([
  { name: "eventImages", maxCount: 10 }, // Adjust maxCount as needed
  { name: "seatingArrangementImages", maxCount: 5 }, // Adjust maxCount as needed
]);

// getEvents
router.get("/", getEvents);

// getUserEvents
router.get("/user/:id", getUserEvents);

// getEventById
router.get("/:id", getEventById);

router.post("/upload", upload.single("file"), exampleAction);

// createEvent
router.post("/", uploadFields, createEvent);

// updateEvent
router.put("/:id", uploadFields, updateEvent);

// deleteEvent
router.delete("/:id", deleteEvent);

// update ticketsBooked in event
router.put("/booking-update/:id", bookedTicketsUpdate);

// TODO: Admin Routes

// Get All Events (Admin)

router.get(
  "/admin-all-events",
  isAuthenticated,
  isAdmin("admin"),
  getAlleventsAdmin
);

// Get User Events (Admin)

// Get Event By Id (Admin)

// Create Event (Admin)

// Update Event (Admin)

// Delete Event (Admin)
router.delete(
  "/admin-delete-event/:id",
  isAuthenticated,
  isAdmin("admin"),
  deleteSingleEventAdmin
);

// Delete All Events (Admin)

module.exports = router;
