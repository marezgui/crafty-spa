import { combineReducers } from "@reduxjs/toolkit";
import { timelinesSlice } from "./slices/timelimesSlice";
import { messagesSlice } from "./slices/messagesSlice";

export const reducer = combineReducers({
  [timelinesSlice.name]: timelinesSlice.reducer,
  [messagesSlice.name]: messagesSlice.reducer,
});
