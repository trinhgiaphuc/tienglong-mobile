
// TODO:

import { createSlice } from "@reduxjs/toolkit";
import { UserDetails } from "../../typings";

type UserState = UserDetails | null;

const INITIAL_STATE = null;

const UserSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    get: (state, action) => {
      state = action.payload
    },
    update: (state, { payload }) => {
      for (const k of payload) {
        state[k] = payload[k]
      }
    },
    delete: (state) => {
      state = null;
    }
  }
})
