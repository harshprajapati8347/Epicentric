import axios from "axios";

// load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });
    const { data } = await axios.get(
      `${import.meta.env.VITE_REACT_APP_SERVER_URL}/user/getuser`,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoadUserFail",
      payload: error.response.data.message,
    });
  }
};

// logout user
export const logoutUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "logoutUserRequest",
    });

    const { data } = await axios.get(
      `${import.meta.env.VITE_REACT_APP_SERVER_URL}/user/logout`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: "logoutUserSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "logoutUserFailed",
      payload: error.response.data.message,
    });
  }
};

// user update information
export const updateUserInformation =
  (firstName, lastName, email, aboutMe, phoneNumber, password) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "updateUserInfoRequest",
      });

      const { data } = await axios.put(
        `${import.meta.env.VITE_REACT_APP_SERVER_URL}/user/update-user-info`,
        {
          email,
          password,
          aboutMe,
          phoneNumber,
          firstName,
          lastName,
        },
        {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Credentials": true,
          },
        }
      );

      dispatch({
        type: "updateUserInfoSuccess",
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: "updateUserInfoFailed",
        payload: error.response.data.message,
      });
    }
  };

// update user address
export const updatUserAddress =
  (address1, address2, city, state, country, zipCode, addressType) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "updateUserAddressRequest",
      });

      const { data } = await axios.put(
        `${
          import.meta.env.VITE_REACT_APP_SERVER_URL
        }/user/update-user-addresses`,
        {
          country,
          city,
          address1,
          address2,
          zipCode,
          addressType,
        },
        { withCredentials: true }
      );

      dispatch({
        type: "updateUserAddressSuccess",
        payload: {
          successMessage: "User address updated succesfully!",
          user: data.user,
        },
      });
    } catch (error) {
      dispatch({
        type: "updateUserAddressFailed",
        payload: error.response.data.message,
      });
    }
  };

// delete user address
export const deleteUserAddress = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteUserAddressRequest",
    });

    const { data } = await axios.delete(
      `${
        import.meta.env.VITE_REACT_APP_SERVER_URL
      }/user/delete-user-address/${id}`,
      { withCredentials: true }
    );

    dispatch({
      type: "deleteUserAddressSuccess",
      payload: {
        successMessage: "User deleted successfully!",
        user: data.user,
      },
    });
  } catch (error) {
    dispatch({
      type: "deleteUserAddressFailed",
      payload: error.response.data.message,
    });
  }
};

export const updateSocialProfiles = (socialProfiles) => async (dispatch) => {
  try {
    dispatch({
      type: "updateSocialProfilesRequest",
    });

    const { data } = await axios.put(
      `${
        import.meta.env.VITE_REACT_APP_SERVER_URL
      }/user/update-social-profiles`,
      {
        socialProfiles,
      },
      { withCredentials: true }
    );

    dispatch({
      type: "updateSocialProfilesSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "updateSocialProfilesFailed",
      payload: error.response.data.message,
    });
  }
};

// get user by id
export const getUserById = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getUserByIdRequest",
    });

    const { data } = await axios.get(
      `${import.meta.env.VITE_REACT_APP_SERVER_URL}/user/user-info/${id}`,
      { withCredentials: true }
    );

    dispatch({
      type: "getUserByIdSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "getUserByIdFailed",
      payload: error.response.data.message,
    });
  }
};

// get all users --- admin
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllUsersRequest",
    });

    const { data } = await axios.get(
      `${import.meta.env.VITE_REACT_APP_SERVER_URL}/user/admin-all-users`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: "getAllUsersSuccess",
      payload: data.users,
    });
  } catch (error) {
    dispatch({
      type: "getAllUsersFailed",
      payload: error.response.data.message,
    });
  }
};

// Update User -- admin

export const updateUserByAdmin = (user) => async (dispatch) => {
  try {
    dispatch({
      type: "updateUserByAdminRequest",
    });

    const { data } = await axios.put(
      `${import.meta.env.VITE_REACT_APP_SERVER_URL}/user/update-user/${
        user._id
      }`,
      {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        avatar: user.avatar,
        address: user.address,
      },
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: "updateUserByAdminSuccess",
      payload: data.user,
    });

    dispatch(getAllUsers());
  } catch (error) {
    dispatch({
      type: "updateUserByAdminFailed",
      payload: error.response.data.message,
    });
  }
};

// Block User From Creating Event

export const blockUserFromCreatingEvent = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "BlockUserFromCreatingEventRequest",
    });

    const { data } = await axios.put(
      `${
        import.meta.env.VITE_REACT_APP_SERVER_URL
      }/user/block-user-from-creating-event/${id}`,
      {},
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: "BlockUserFromCreatingEventSuccess",
      payload: data.user,
    });

    dispatch(getAllUsers());
  } catch (error) {
    dispatch({
      type: "BlockUserFromCreatingEventFailed",
      payload: error.response.data.message,
    });
  }
};
