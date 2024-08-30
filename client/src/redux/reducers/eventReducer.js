import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  success: false,
  error: null,
  isLoved: false,
};

const eventReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("eventCreateRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("eventCreateSuccess", (state, action) => {
      state.isLoading = false;
      state.event = action.payload;
      state.success = true;
    })
    .addCase("eventCreateFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })
    .addCase("eventCreateReset", (state) => {
      state.success = false;
    })
    //! All Events
    .addCase("getAlleventsRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAlleventsSuccess", (state, action) => {
      state.isLoading = false;
      state.allEvents = action.payload;
    })
    .addCase("getAlleventsFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    //! User Events
    .addCase("getUserEventsRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getUserEventsSuccess", (state, action) => {
      state.isLoading = false;
      state.userEvents = action.payload;
    })
    .addCase("getUserEventsFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    //! Event by ID
    .addCase("getEventByIdRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getEventByIdSuccess", (state, action) => {
      state.isLoading = false;
      state.event = action.payload;
    })
    .addCase("getEventByIdFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    //! Update Event
    .addCase("updateEventRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("updateEventSuccess", (state, action) => {
      state.isLoading = false;
      state.event = action.payload;
      state.success = true;
    })
    .addCase("updateEventFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })
    //! Delete Event
    .addCase("eventDeleteRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("eventDeleteSuccess", (state, action) => {
      state.isLoading = false;
      state.success = true;
    })
    .addCase("eventDeleteFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })
    //! Clear Errors
    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});

export default eventReducer;
