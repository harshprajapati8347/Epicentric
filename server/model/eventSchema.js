const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  eventName: {
    type: String,
    required: true,
  },
  startTime: {
    type: Date,
  },
  endTime: {
    type: Date,
  },
  isReoccuring: {
    type: Boolean,
    default: false,
  },
  reoccuringValue: {
    type: String,
  },
  reoccStart: {
    type: String,
  },
  reoccEnd: {
    type: String,
  },
  reoccuringTimeTable: {
    startDate: {
      type: String,
    },
    endDate: {
      type: String,
    },
    startMonth: {
      type: String,
    },
    endMonth: {
      type: String,
    },
    startYear: {
      type: String,
    },
    endYear: {
      type: String,
    },
  },
  location: {
    type: String,
    required: true,
  },
  // mapLocation: {
  //   latitude: {
  //     type: Number,
  //     default: 0,
  //   },
  //   longitude: {
  //     type: Number,
  //     default: 0,
  //   },
  // },
  eventLocation: {
    address1: {
      type: String,
    },
    address2: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
    },
    zipCode: {
      type: Number,
    },
  },
  eventCategory: {
    type: String,
    required: true,
  },
  socialProfiles: {
    youtube: {
      type: String,
    },
    instagram: {
      type: String,
    },
    facebook: {
      type: String,
    },
    twitter: {
      type: String,
    },
  },
  eventDescription: {
    type: String,
    required: true,
  },
  eventVideoLink: {
    type: String,
  },
  eventVideo: {
    type: String,
  },
  seatingArrangementImages: [
    {
      type: String,
    },
  ],
  eventImages: [
    {
      type: String,
    },
  ],
  ticketType: {
    type: String,
    enum: ["Paid", "Free", "Donation"],
    default: "Free",
  },
  customTicketTypes: [
    {
      ticketID: {
        type: String,
      },
      type: {
        type: String,
      },
      name: {
        type: String,
      },
      price: {
        type: String,
      },
      description: {
        type: String,
      },
      ticketCapacity: {
        type: String,
      },
      reserveTickets: {
        type: String,
      },
      ticketsBooked: {
        type: String,
      },
    },
  ],
  ticketPrice: {
    type: Number,
    default: 0,
  },
  paymentOptions: {
    paypal: {
      type: Boolean,
      default: false,
    },
    stripe: {
      type: Boolean,
      default: true,
    },
  },
  ticketingWebsite: {
    type: String,
  },
  published: {
    type: Boolean,
    default: false,
  },
  loveCount: {
    type: Number,
    default: 0,
  },
  ticketsBooked: {
    type: Number,
    default: 0,
  },
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
