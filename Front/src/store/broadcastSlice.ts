import { createSlice } from "@reduxjs/toolkit";

export interface BroadcastState {
  broadcastId: number;
}

const initialState: BroadcastState = {
  broadcastId: 0,
};

export const broadcastSlice = createSlice({
  name: "broadcast",
  initialState,
  reducers: {
    set(state, action) {
      state.broadcastId = action.payload;
    },
  },
});

export const { set } = broadcastSlice.actions;
export default broadcastSlice.reducer;
