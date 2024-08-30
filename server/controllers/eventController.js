const Event = require("../model/eventSchema");
const asyncHandler = require("express-async-handler");
const path = require("path");

// @desc    Get all events
// @route   GET /api/events
// @access  Public

const getEvents = asyncHandler(async (req, res) => {
  try {
    const events = await Event.find({}).sort({ createdAt: -1 }); // newest first
    res.json(events);
  } catch (error) {
    console.log(error);
    res.status;
  }
});

const getUserEvents = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const events = await Event.find({ createdBy: id }).sort({
      createdAt: -1, // newest first
    });
    res.json(events);
  } catch (error) {
    console.log(error);
    res.status;
  }
});

// @desc    Get single event
// @route   GET /api/events/:id
// @access  Public

const getEventById = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (event) {
    res.json(event);
  } else {
    res.status(404);
    throw new Error("Event not found");
  }
});

// Example Action for Multer
const exampleAction = asyncHandler(async (req, res) => {
  try {
    const filename = req.file.filename;
    const fileUrl = path.join(filename);

    res.status(201).json({
      success: true,
      data: fileUrl,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to create a event, please try again",
    });
  }
});

// @desc    Create an event
// @route   POST /api/events
// @access  Private/Admin

const createEvent = asyncHandler(async (req, res) => {
  try {
    console.log("req.body", req.body);
    const eventImageUrls = req.files["eventImages"]?.map(
      (file) => file.filename
    );
    const seatingArrangementImageUrls = req.files[
      "seatingArrangementImages"
    ]?.map((file) => file.filename);
    const customTicketTypesObj = req.body.customTicketTypes.map((ticket) =>
      JSON.parse(ticket)
    );
    const event = {
      ...req.body,
      seatingArrangementImages: seatingArrangementImageUrls,
      eventImages: eventImageUrls,
      eventLocation: JSON.parse(req.body.eventLocation),
      mapLocation: JSON.parse(req.body.mapLocation),
      reoccuringTimeTable: JSON.parse(req.body.reoccuringTimeTable),
      socialProfiles: JSON.parse(req.body.socialProfiles),
      customTicketTypes: customTicketTypesObj,
    };
    const createdEvent = await Event.create(event);
    res.status(201).json({
      success: true,
      data: createdEvent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Unable to create a event, please try again",
    });
  }
});

// @desc    Update an event
// @route   PUT /api/events/:id
// @access  Private/Admin

const updateEvent = asyncHandler(async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (event) {
      const eventImageUrls =
        req.files && req.files["eventImages"]?.map((file) => file.filename);
      const seatingArrangementImageUrls =
        req.files &&
        req.files["seatingArrangementImages"]?.map((file) => file.filename);

      const customTicketTypesObj = req.body.customTicketTypes.map((ticket) =>
        JSON.parse(ticket)
      );

      event.set({
        ...req.body,
        eventLocation: req.body.eventLocation,
        mapLocation: req.body.mapLocation,
        reoccuringTimeTable: JSON.parse(req.body.reoccuringTimeTable),
        socialProfiles: req.body.socialProfiles,
        customTicketTypes: customTicketTypesObj,
      });

      // Concatenate new image URLs to existing arrays
      if (eventImageUrls) {
        event.eventImages = event.eventImages.concat(eventImageUrls);
      }
      if (seatingArrangementImageUrls) {
        event.seatingArrangementImages = event.seatingArrangementImages.concat(
          seatingArrangementImageUrls
        );
      }

      const updated = await event.save(); // Save the updated event

      res.status(200).json({
        success: true,
        data: updated,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Unable to update the event, please try again",
    });
  }
});

// @desc    Delete an event
// @route   DELETE /api/events/:id
// @access  Private/Admin

const deleteEvent = asyncHandler(async (req, res) => {
  // if (event) {
  //   // await event.remove();
  //   // delete event and all associated data from database
  //   await Event.findByIdAndDelete(req.params.id);
  //   res.json({
  //     success: true,
  //     message: "Event removed",
  //   });
  // } else {
  //   res.status(404);
  //   throw new Error("Event not found");
  // }
  try {
    const event = await Event.findById(req.params.id);
    if (event) {
      // await event.remove();
      // delete event and all associated data from database
      await Event.findByIdAndDelete(req.params.id);
      res.json({
        success: true,
        message: "Event removed",
      });
    } else {
      res.status(404);
      throw new Error("Event not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Unable to delete a event, please try again",
    });
  }
});

// Admin Routes

// Get All Events (Admin)

const getAlleventsAdmin = asyncHandler(async (req, res) => {
  try {
    const events = await Event.find({}).sort({ createdAt: -1 }); // newest first
    res.status(200).json({
      success: true,
      data: events,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Unable to get all events for admin, please try again",
    });
  }
});

// Delete Single Event (Admin)

const deleteSingleEventAdmin = asyncHandler(async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (event) {
      await Event.findByIdAndDelete(req.params.id);
      res.json({
        success: true,
        message: "Event removed",
      });
    } else {
      res.status(404);
      throw new Error("Event not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Unable to delete a event, please try again",
    });
  }
});

// Booked Tickets Update - body = ticketsBooked

const bookedTicketsUpdate = asyncHandler(async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (event) {
      event.ticketsBooked = req.body.totalTicketsBooked;
      const updated = await event.save();
      res.status(200).json({
        success: true,
        data: updated,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Unable to update the event, please try again",
    });
  }
});

// Get User Events (Admin)

// const getUserEventsAdmin = asyncHandler(async (req, res) => {
//   try {
//     const id = req.params.id;
//     const events = await Event.find({ createdBy: id }).sort({
//       createdAt: -1, // newest first
//     });
//     res.status(200).json({
//       success: true,
//       data: events,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       success: false,
//       message: "Unable to get user events for admin, please try again",
//     });
//   }
// });

// Get Event By Id (Admin)

// Create Event (Admin)

// Update Event (Admin)

// Delete Event (Admin)

module.exports = {
  getEvents,
  getUserEvents,
  getEventById,
  createEvent,
  exampleAction,
  updateEvent,
  deleteEvent,
  // Admin Routes
  getAlleventsAdmin,
  deleteSingleEventAdmin,
  bookedTicketsUpdate,
};
