import { createSlice } from "@reduxjs/toolkit";
import { getAuthUserTimeline } from "../usecases/getAuthUserTimeline.usecase";

type TimelinesState = {
  user: string;
  messages: {
    text: string;
    author: string;
    publishedAt: string;
  }[];
};

export const timelinesSlice = createSlice({
  name: "timelines",
  initialState: {} as TimelinesState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAuthUserTimeline.fulfilled, (_, action) => {
      return {
        id: action.payload.id,
        user: action.payload.user,
        messages: action.payload.messages,
      };
    });
  },
});

export default timelinesSlice.reducer;
