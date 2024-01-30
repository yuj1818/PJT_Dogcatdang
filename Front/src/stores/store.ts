import { configureStore } from "@reduxjs/toolkit";
import { UserState, userSlice } from "./auth";

export interface StoreInterface {
  user: UserState;
}

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});
