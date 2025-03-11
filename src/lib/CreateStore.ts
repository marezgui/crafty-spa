import { AnyAction, configureStore, ThunkDispatch } from "@reduxjs/toolkit";
import timelinesReducer from "./timelines/slices/timelimesSlice";
import { AuthGateway } from "./auth/model/AuthGateway";
import { TimelineGateway } from "./timelines/model/TimelineGateway";

export type Dependencies = {
  authGateway: AuthGateway;
  timelineGateway: TimelineGateway;
};

export const rootReducer = timelinesReducer;

export const createStore = (dependencies: Dependencies) =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: dependencies,
        },
      }),
  });

export type AppStore = ReturnType<typeof createStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, Dependencies, AnyAction>;
