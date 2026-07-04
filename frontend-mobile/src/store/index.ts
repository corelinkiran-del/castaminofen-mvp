// Redux store setup

import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices/auth.slice';
import { userReducer } from './slices/user.slice';
import { playerReducer } from './slices/player.slice';
import { uiReducer } from './slices/ui.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    player: playerReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
