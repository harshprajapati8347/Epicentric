import axios from "axios";
import { toast } from "react-toastify";

// Get All User Tickets - User
export const getAllUserBookings = () => async (dispatch) => {
  try {
    dispatch({ type: "getAllUserBookingsRequest" });

    const { data } = await axios.get(
      `${import.meta.env.VITE_REACT_APP_SERVER_URL}/booking/get-all-tickets`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: "getAllUserBookingsSuccess",
      payload: data,
    });
    console.log("get bookingAction", data);
  } catch (error) {
    dispatch({
      type: "getAllUserBookingsFailed",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Create a ticket booking - User
export const booking =
  (tickets, event, user, totalPrice, paymentId) => async (dispatch) => {
    try {
      dispatch({ type: "bookingRequest" });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

      const { data } = await axios.post(
        `${import.meta.env.VITE_REACT_APP_SERVER_URL}/booking`,
        {
          tickets,
          event,
          user,
          totalPrice,
          paymentId,
        },
        config
      );

      dispatch({
        type: "bookingSuccess",
        payload: data.data,
      });
      console.log("post bookingAction", data.data);
    } catch (error) {
      dispatch({
        type: "bookingFailed",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// Refund a booking - User
export const refundBooking = (bookingID) => async (dispatch) => {
  try {
    dispatch({ type: "refundBookingRequest" });

    await axios.delete(
      `${
        import.meta.env.VITE_REACT_APP_SERVER_URL
      }/booking/refund-ticket/${bookingID}`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: "refundBookingSuccess",
    });
    toast.success("Booking Cancelled Successfully!");
    dispatch(getAllUserBookings());
  } catch (error) {
    dispatch({
      type: "refundBookingFailed",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Refund - Stripe Payment - User

export const refundStripePayment = (paymentId) => async (dispatch) => {
  try {
    dispatch({ type: "refundStripePaymentRequest" });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios.post(
      `${import.meta.env.VITE_REACT_APP_SERVER_URL}/payment/refund`,
      { paymentId },
      config
    );

    dispatch({
      type: "refundStripePaymentSuccess",
    });
    toast.success("Refund will be processed in 5-10 business days");
  } catch (error) {
    dispatch({
      type: "refundStripePaymentFailed",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Admin - Refund a booking
export const adminRefundBooking = (paymentId) => async (dispatch) => {
  try {
    dispatch({ type: "adminRefundBookingRequest" });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios.post(
      `${import.meta.env.VITE_REACT_APP_SERVER_URL}/payment/refund`,
      { paymentId },
      config
    );

    dispatch({
      type: "adminRefundBookingSuccess",
    });
    toast.success("Refund Initiated Successfully");
  } catch (error) {
    dispatch({
      type: "adminRefundBookingFailed",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Admin: Delete a booking
export const adminDeleteBooking = (id) => async (dispatch) => {
  try {
    dispatch({ type: "adminDeleteBookingRequest" });

    await axios
      .delete(
        `${
          import.meta.env.VITE_REACT_APP_SERVER_URL
        }/booking/admin-delete-ticket/${id}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        toast.success(res.data.message);
      });
    dispatch({
      type: "adminDeleteBookingSuccess",
    });
    dispatch(getBookings());
  } catch (error) {
    dispatch({
      type: "adminDeleteBookingFailed",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Admin: Get All Bookings
export const getBookings = () => async (dispatch) => {
  try {
    dispatch({ type: "adminGetBookingsRequest" });

    const { data } = await axios.get(
      `${
        import.meta.env.VITE_REACT_APP_SERVER_URL
      }/booking/admin-get-all-tickets`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: "adminGetBookingsSuccess",
      payload: data,
    });
    console.log("get bookingAction", data);
  } catch (error) {
    dispatch({
      type: "adminGetBookingsFailed",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
