import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  socialProfiles: {
    instagram: "",
    twitter: "",
    youtube: "",
    facebook: "",
  },
};

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("LoadUserRequest", (state) => {
      state.loading = true;
    })
    .addCase("LoadUserSuccess", (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    })
    .addCase("LoadUserFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    })
    // logout user
    .addCase("logoutUserRequest", (state) => {
      state.loading = true;
    })
    .addCase("logoutUserSuccess", (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
    })
    .addCase("logoutUserFailed", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // update user information
    .addCase("updateUserInfoRequest", (state) => {
      state.loading = true;
    })
    .addCase("updateUserInfoSuccess", (state, action) => {
      state.loading = false;
      state.user = action.payload;
    })
    .addCase("updateUserInfoFailed", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // update user address
    .addCase("updateUserAddressRequest", (state) => {
      state.addressloading = true;
    })
    .addCase("updateUserAddressSuccess", (state, action) => {
      state.addressloading = false;
      state.successMessage = action.payload.successMessage;
      state.user = action.payload.user;
    })
    .addCase("updateUserAddressFailed", (state, action) => {
      state.addressloading = false;
      state.error = action.payload;
    })

    // delete user address
    .addCase("deleteUserAddressRequest", (state) => {
      state.addressloading = true;
    })
    .addCase("deleteUserAddressSuccess", (state, action) => {
      state.addressloading = false;
      state.successMessage = action.payload.successMessage;
      state.user = action.payload.user;
    })
    .addCase("deleteUserAddressFailed", (state, action) => {
      state.addressloading = false;
      state.error = action.payload;
    })

    // get user by id
    .addCase("getUserByIdRequest", (state) => {
      state.loading = true;
    })
    .addCase("getUserByIdSuccess", (state, action) => {
      state.loading = false;
      state.user = action.payload;
    })
    .addCase("getUserByIdFailed", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // get all users --- admin
    .addCase("getAllUsersRequest", (state) => {
      state.usersLoading = true;
    })
    .addCase("getAllUsersSuccess", (state, action) => {
      state.usersLoading = false;
      state.users = action.payload;
    })
    .addCase("getAllUsersFailed", (state, action) => {
      state.usersLoading = false;
      state.error = action.payload;
    })
    .addCase("clearErrors", (state) => {
      state.error = null;
    })
    .addCase("clearMessages", (state) => {
      state.successMessage = null;
    })
    // Update socialProfiles
    .addCase("updateSocialProfilesRequest", (state) => {
      state.loading = true;
    })
    .addCase("updateSocialProfilesSuccess", (state, action) => {
      state.loading = false;
      state.socialProfiles = action.payload;
    })
    .addCase("updateSocialProfilesFailed", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("updateUserByAdminRequest", (state) => {
      state.loading = true;
    })
    .addCase("updateUserByAdminSuccess", (state, action) => {
      state.loading = false;
      state.updatedUser = action.payload;
    })
    .addCase("updateUserByAdminFailed", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("BlockUserFromCreatingEventRequest", (state) => {
      state.loading = true;
    })
    .addCase("BlockUserFromCreatingEventSuccess", (state, action) => {
      state.loading = false;
      state.updatedUser = action.payload;
    })
    .addCase("BlockUserFromCreatingEventFailed", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
});

export default userReducer;
