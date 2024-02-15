import { configureStore } from "@reduxjs/toolkit";
import broadcastSlice, { BroadcastState } from "./broadcastSlice";

export interface RootState {
  broadcast: BroadcastState;
}
const store = configureStore({
  reducer: {
    broadcast: broadcastSlice,
  },
});

export default store;
