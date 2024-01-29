import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from './auth';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  }
});