import { AnyAction, configureStore, ThunkDispatch } from "@reduxjs/toolkit";
import { AuthGateway } from "./auth/model/AuthGateway";
import { TimelineGateway } from "./timelines/model/TimelineGateway";
import { reducer as timelinesReducer } from "./timelines/reducer";
import { FakeAuthGateway } from "./auth/infra/FakeAuthGateway";
import { FakeTimelineGateway } from "./timelines/infra/FakeTimelineGateway";

export type Dependencies = {
  authGateway: AuthGateway;
  timelineGateway: TimelineGateway;
};

export const rootReducer = timelinesReducer;

export const createStore = (
  dependencies: Dependencies,
  preloadedState?: Partial<ReturnType<typeof rootReducer>>
) =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: dependencies,
        },
      }),
    preloadedState,
  });

export const createTestStore = (
  {
    authGateway = new FakeAuthGateway(),
    timelineGateway = new FakeTimelineGateway(),
  }: Partial<Dependencies> = {},
  preloadedState?: Partial<ReturnType<typeof rootReducer>>
) =>
  createStore(
    {
      authGateway,
      timelineGateway,
    },
    preloadedState
  );

export type AppStore = ReturnType<typeof createStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, Dependencies, AnyAction>;
