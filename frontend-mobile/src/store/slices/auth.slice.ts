// Auth reducer

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IAuthState {
  isAuthenticated: boolean;
  accessToken?: string;
  refreshToken?: string;
  userId?: string;
  isLoading: boolean;
  error?: string;
}

const initialState: IAuthState = {
  isAuthenticated: false,
  isLoading: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.error = undefined;
    },
    loginSuccess: (state, action: PayloadAction<{ accessToken: string; userId: string }>) => {
      state.isAuthenticated = true;
      state.accessToken = action.payload.accessToken;
      state.userId = action.payload.userId;
      state.isLoading = false;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.accessToken = undefined;
      state.userId = undefined;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
