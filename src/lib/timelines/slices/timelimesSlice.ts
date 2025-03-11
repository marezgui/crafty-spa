import { createSlice } from "@reduxjs/toolkit";
import { getAuthUserTimeline } from "../usecases/getAuthUserTimeline.usecase";
import { timelinesAdapter } from "../model/timelinesAdapter";
import { RootState } from "@/lib/createStore";

export const timelinesSlice = createSlice({
  name: "timelines",
  initialState: timelinesAdapter.getInitialState(),
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAuthUserTimeline.fulfilled, (state, action) => {
      const timeline = action.payload;
      timelinesAdapter.addOne(state, {
        id: timeline.id,
        user: timeline.user,
        messages: timeline.messages.map((m) => m.id),
      });
    });
  },
});

export const selectUserTimeline = (timelineId: string, state: RootState) => {
  return timelinesAdapter
    .getSelectors()
    .selectById(state.timelines, timelineId);
};
