import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { UserDetails } from '../../typings';

// Define a type for the slice state
interface AuthState {
  status: 'authenticated' | 'unauthenticated' | 'loading';
  userDetails: UserDetails | null
}

// Define the initial state using that type
const initialState: AuthState = {
  status: 'unauthenticated',
  userDetails: null,
}

export const authSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    login: (state: AuthState, action: PayloadAction<AuthState['userDetails']>) => {
      state.userDetails = action.payload;
      state.status = 'authenticated';
    },
    logout: (state: AuthState) => {
      state.userDetails = null;
      state.status = 'unauthenticated';
    },
    update: (state: AuthState, action) => {
      state.userDetails = { ...state.userDetails, ...action.payload };
    }
  },
});

export const { login, logout, update } = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
