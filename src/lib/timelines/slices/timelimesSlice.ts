import { createSlice, EntityState } from "@reduxjs/toolkit";
import { getAuthUserTimeline } from "../usecases/getAuthUserTimeline.usecase";
import { Timeline, timelinesAdapter } from "../model/timelinesAdapter";
import { RootState } from "@/lib/createStore";

export type TimelimesSliceState = EntityState<Timeline, "alice-timeline-id"> & {
  loadingTimelineByUser: { [userId: string]: boolean };
};

export const timelinesSlice = createSlice({
  name: "timelines",
  initialState: timelinesAdapter.getInitialState({
    loadingTimelineByUser: {},
  }) as TimelimesSliceState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAuthUserTimeline.pending, (state) => {
      state.loadingTimelineByUser["Alice"] = true;
    }),
      builder.addCase(getAuthUserTimeline.fulfilled, (state, action) => {
        const timeline = action.payload;
        timelinesAdapter.addOne(state, {
          id: timeline.id,
          user: timeline.user,
          messages: timeline.messages.map((m) => m.id),
        });
        state.loadingTimelineByUser["Alice"] = false;
      });
  },
});

export const selectUserTimeline = (timelineId: string, state: RootState) => {
  return timelinesAdapter
    .getSelectors()
    .selectById(state.timelines, timelineId);
};

export const selectIsUserTimelineLoading = (user: string, state: RootState) => {
  return state.timelines.loadingTimelineByUser[user] ?? false;
};
