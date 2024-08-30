import { configureStore } from "@reduxjs/toolkit";
import eventReducer from "./reducers/eventReducer";
import userReducer from "./reducers/userReducer";
import bookingReducer from "./reducers/bookingReducer";

const Store = configureStore({
  reducer: {
    user: userReducer,
    events: eventReducer,
    booking: bookingReducer,
  },
});

export default Store;
