import { AppStore } from "@/lib/createStore";
import { getAuthUserTimeline } from "@/lib/timelines/usecases/getAuthUserTimeline.usecase";
import { LoaderFunction } from "react-router";

export const createHomeloader =
  ({ store }: { store: AppStore }): LoaderFunction =>
  () => {
    store.dispatch(getAuthUserTimeline());
  };
