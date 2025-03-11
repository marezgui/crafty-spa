import { createSlice } from "@reduxjs/toolkit";
import { messageAdapter } from "../model/messageAdapter";
import { RootState } from "@/lib/createStore";
import { getAuthUserTimeline } from "../usecases/getAuthUserTimeline.usecase";

const initialState = messageAdapter.getInitialState();

export const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAuthUserTimeline.fulfilled, (state, action) => {
      messageAdapter.addMany(state, action.payload.messages);
    });
  },
});

export const selectMessage = (id: string, state: RootState) =>
  messageAdapter.getSelectors().selectById(state.messages, id);

export const selectMessages = (ids: string[], state: RootState) =>
  ids.map((id) => selectMessage(id, state)).filter(Boolean);
