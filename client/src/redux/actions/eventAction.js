import axios from "axios";
// create event
export const createevent = (newForm) => async (dispatch) => {
  try {
    dispatch({ type: "eventCreateRequest" });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const newFormData = new FormData();
    newFormData.append("eventName", newForm?.eventName);
    newFormData.append("startTime", newForm?.startTime);
    newFormData.append("endTime", newForm?.endTime);
    newFormData.append("isReoccuring", newForm?.isReoccuring);
    newFormData.append("reoccuringValue", newForm?.reoccuringValue);
    newFormData.append("reoccStart", newForm?.reoccStart);
    newFormData.append("reoccEnd", newForm?.reoccEnd);
    newFormData.append("eventCategory", newForm?.eventCategory);
    newForm?.eventVideoLink
      ? newFormData.append("eventVideoLink", newForm?.eventVideoLink)
      : null;
    newFormData.append("eventVideo", newForm?.eventVideo);
    newFormData?.bannerEventVideoLink
      ? newFormData.append(
          "bannerEventVideoLink",
          newForm?.bannerEventVideoLink
        )
      : null;
    newFormData.append("location", newForm?.location);
    newFormData?.onlineEventUrl
      ? newFormData.append("onlineEventUrl", newForm?.onlineEventUrl)
      : null;
    newFormData.append("createdBy", newForm?.createdBy);
    newFormData.append(
      "eventLocation",
      JSON.stringify({
        address1: newForm?.eventLocation?.address1,
        address2: newForm?.eventLocation?.address2,
        city: newForm?.eventLocation?.city,
        state: newForm?.eventLocation?.state,
        country: newForm?.eventLocation?.country,
        zipCode: newForm?.eventLocation?.zipCode,
      })
    );
    // newFormData.append(
    //   "mapLocation",
    //   JSON.stringify({
    //     latitude: newForm?.mapLocation?.latitude,
    //     longitude: newForm?.mapLocation?.longitude,
    //   })
    // );
    newFormData.append(
      "reoccuringTimeTable",
      JSON.stringify({
        startYear: newForm?.reoccuringTimeTable?.startYear,
        endYear: newForm?.reoccuringTimeTable?.endYear,
        startMonth: newForm?.reoccuringTimeTable?.startMonth,
        endMonth: newForm?.reoccuringTimeTable?.endMonth,
        startDate: newForm?.reoccuringTimeTable?.startDate,
        endDate: newForm?.reoccuringTimeTable?.endDate,
      })
    );
    newFormData.append(
      "socialProfiles",
      JSON.stringify(newForm?.socialProfiles)
    );
    newFormData.append("eventDescription", newForm?.eventDescription);
    newFormData.append("ticketsBooked", newForm?.ticketsBooked);

    for (let i = 0; i < newForm?.customTicketTypes?.length; i++) {
      newFormData.append(
        "customTicketTypes",
        JSON.stringify(newForm?.customTicketTypes[i])
      );
    }
    for (let i = 0; i < newForm?.seatingArrangementImages?.length; i++) {
      if (newForm?.seatingArrangementImages[i]) {
        newFormData.append(
          "seatingArrangementImages",
          newForm?.seatingArrangementImages[i]
        );
      }
    }
    for (let i = 0; i < newForm?.eventImages?.length; i++) {
      newFormData.append("eventImages", newForm?.eventImages[i]);
    }
    console.log("newFormData", newFormData);
    const { data } = await axios.post(
      `${import.meta.env.VITE_REACT_APP_SERVER_URL}/events`,
      newFormData,
      config
    );
    dispatch({ type: "eventCreateSuccess", payload: data });
    console.log("newFormData data", data);
  } catch (error) {
    dispatch({ type: "eventCreateFail", payload: error.response.data.message });
  }
};

// event Create Reset

export const eventCreateReset = () => async (dispatch) => {
  dispatch({ type: "eventCreateReset" });
};

// get all events
export const getAllevents = () => async (dispatch) => {
  try {
    dispatch({ type: "getAlleventsRequest" });

    const { data } = await axios.get(
      `${import.meta.env.VITE_REACT_APP_SERVER_URL}/events`
    );

    dispatch({ type: "getAlleventsSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "getAlleventsFailed",
      payload: error.response.data.message,
    });
  }
};

// get user events
export const getUserEvents = (id) => async (dispatch) => {
  try {
    dispatch({ type: "getUserEventsRequest" });
    const { data } = await axios.get(
      `${import.meta.env.VITE_REACT_APP_SERVER_URL}/events/user/${id}`
    );

    dispatch({ type: "getUserEventsSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "getUserEventsFailed",
      payload: error.response.data.message,
    });
  }
};

// get event by id
export const geteventById = (id) => async (dispatch) => {
  try {
    dispatch({ type: "getEventByIdRequest" });

    const { data } = await axios.get(
      `${import.meta.env.VITE_REACT_APP_SERVER_URL}/events/${id}`
    );

    dispatch({ type: "getEventByIdSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "getEventByIdFailed",
      payload: error.response.data.message,
    });
  }
};

// update event

export const updateEvent = (updatedForm, id) => async (dispatch) => {
  try {
    dispatch({ type: "eventUpdateRequest" });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    console.log("updatedForm", updatedForm);
    const updatedFormData = new FormData();
    updatedFormData.append("eventName", updatedForm?.eventName);
    updatedFormData.append("startTime", updatedForm?.startTime);
    updatedFormData.append("endTime", updatedForm?.endTime);
    updatedFormData.append("isReoccuring", updatedForm?.isReoccuring);
    updatedFormData.append("reoccuringValue", updatedForm?.reoccuringValue);
    updatedFormData.append("reoccStart", updatedForm?.reoccStart);
    updatedFormData.append("reoccEnd", updatedForm?.reoccEnd);
    updatedFormData.append("eventCategory", updatedForm?.eventCategory);
    updatedFormData.append("eventVideoLink", updatedForm?.eventVideoLink);
    updatedFormData.append("eventVideo", updatedForm?.eventVideo);
    updatedFormData.append(
      "bannerEventVideoLink",
      updatedForm?.bannerEventVideoLink
    );
    updatedFormData.append("location", updatedForm?.location);
    updatedFormData.append("onlineEventUrl", updatedForm?.onlineEventUrl);
    updatedFormData.append("createdBy", updatedForm?.createdBy);
    updatedFormData.append(
      "eventLocation",
      JSON.stringify({
        address1: updatedForm?.eventLocation?.address1,
        address2: updatedForm?.eventLocation?.address2,
        city: updatedForm?.eventLocation?.city,
        state: updatedForm?.eventLocation?.state,
        country: updatedForm?.eventLocation?.country,
        zipCode: updatedForm?.eventLocation?.zipCode,
      })
    );
    // updatedFormData.append(
    //   "mapLocation",
    //   JSON.stringify({
    //     latitude: updatedForm?.mapLocation?.latitude,
    //     longitude: updatedForm?.mapLocation?.longitude,
    //   })
    // );
    updatedFormData.append(
      "reoccuringTimeTable",
      JSON.stringify(updatedForm?.reoccuringTimeTable)
    );
    updatedFormData.append(
      "socialProfiles",
      JSON.stringify(updatedForm?.socialProfiles)
    );
    updatedFormData.append("eventDescription", updatedForm?.eventDescription);

    for (let i = 0; i < updatedForm?.customTicketTypes?.length; i++) {
      updatedFormData.append(
        "customTicketTypes",
        JSON.stringify(updatedForm?.customTicketTypes[i])
      );
    }
    for (let i = 0; i < updatedForm?.seatingArrangementImages?.length; i++) {
      updatedFormData.append(
        "seatingArrangementImages",
        updatedForm?.seatingArrangementImages[i]
      );
    }
    for (let i = 0; i < updatedForm?.eventImages?.length; i++) {
      updatedFormData.append("eventImages", updatedForm?.eventImages[i]);
    }
    console.log("updatedFormData", updatedFormData);
    const { data } = await axios.put(
      `${import.meta.env.VITE_REACT_APP_SERVER_URL}/events/${id}`,
      updatedFormData,
      config
    );
    dispatch({ type: "eventUpdateSuccess", payload: data });
    console.log(data, "data");
  } catch (error) {
    console.log("error123", error);
    dispatch({ type: "eventUpdateFail", payload: error.response.data.message });
  }
};

// delete event

export const deleteEvent = (id) => async (dispatch) => {
  try {
    dispatch({ type: "eventDeleteRequest" });

    const { data } = await axios.delete(
      `${import.meta.env.VITE_REACT_APP_SERVER_URL}/events/${id}`
    );

    dispatch({ type: "eventDeleteSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "eventDeleteFail", payload: error.response.data.message });
  }
};
