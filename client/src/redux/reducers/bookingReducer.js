import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  tickets: [],
  event: null,
  user: null,
  totalPrice: null,
  isLoading: false, // Add this line if needed
};

const bookingReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("bookingRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("bookingSuccess", (state, action) => {
      state.isLoading = false;
      state.tickets = action.payload;
    })
    .addCase("bookingFailed", (state, action) => {
      state.isLoading = false;
      state.bookingError = action.payload;
    })
    // Get All User Tickets
    .addCase("getAllUserBookingsRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllUserBookingsSuccess", (state, action) => {
      state.isLoading = false;
      state.tickets = action.payload;
    })
    .addCase("getAllUserBookingsFailed", (state, action) => {
      state.isLoading = false;
      state.bookingError = action.payload;
    })
    .addCase("refundBookingRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("refundBookingSuccess", (state, action) => {
      state.isLoading = false;
      state.tickets = action.payload;
    })
    .addCase("refundBookingFailed", (state, action) => {
      state.isLoading = false;
      state.bookingError = action.payload;
    })
    .addCase("refundStripePaymentRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("refundStripePaymentSuccess", (state, action) => {
      state.isLoading = false;
      state.tickets = action.payload;
    })
    .addCase("refundStripePaymentFailed", (state, action) => {
      state.isLoading = false;
      state.bookingError = action.payload;
    })
    // Admin: Get All Bookings
    .addCase("adminGetBookingsRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("adminGetBookingsSuccess", (state, action) => {
      state.isLoading = false;
      state.tickets = action.payload;
    })
    .addCase("adminGetBookingsFailed", (state, action) => {
      state.isLoading = false;
      state.bookingError = action.payload;
    })
    // Admin: Delete a booking
    .addCase("adminDeleteBookingRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("adminDeleteBookingSuccess", (state, action) => {
      state.isLoading = false;
      state.tickets = action.payload;
    })
    .addCase("adminDeleteBookingFailed", (state, action) => {
      state.isLoading = false;
      state.bookingError = action.payload;
    })
    .addCase("adminRefundBookingRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("adminRefundBookingSuccess", (state, action) => {
      state.isLoading = false;
      state.tickets = action.payload;
    })
    .addCase("adminRefundBookingFailed", (state, action) => {
      state.isLoading = false;
      state.bookingError = action.payload;
    });
});

export default bookingReducer;
