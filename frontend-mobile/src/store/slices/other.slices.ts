// Placeholder slices for Redux store

import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {},
});

export const playerSlice = createSlice({
  name: 'player',
  initialState: {},
  reducers: {},
});

export const uiSlice = createSlice({
  name: 'ui',
  initialState: { darkMode: true, language: 'fa' },
  reducers: {},
});

export const userReducer = userSlice.reducer;
export const playerReducer = playerSlice.reducer;
export const uiReducer = uiSlice.reducer;
