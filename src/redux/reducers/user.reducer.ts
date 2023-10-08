import { createReducer } from "@reduxjs/toolkit";

import { loginGmail } from "../actions/user.action";

import { userAccount } from "../../types/user.type";

// Interface declair
interface UserState {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
}

// InitialState value
const initialState: UserState = {
  uid: "",
  displayName: "",
  email: "",
  photoURL: "",
};

const userReducer = createReducer(initialState, (builder) => {
  builder.addCase(loginGmail, (state, action) => {
    if (action.payload !== undefined) {
      const user: userAccount = action.payload;
      state.uid = user.uid;
      state.displayName = user.displayName;
      state.email = user.email;
      state.photoURL = user.photoURL;
    }
  });
});

export default userReducer;
