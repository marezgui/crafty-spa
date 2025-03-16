import { format as timeAgo } from "timeago.js";
import { RootState } from "@/lib/createStore";
import { selectMessages } from "@/lib/timelines/slices/messagesSlice";
import {
  selectIsUserTimelineLoading,
  selectUserTimeline,
} from "@/lib/timelines/slices/timelimesSlice";

export enum HomeViewModelType {
  NO_TIMELINE = "NO_TIMELINE",
  EMPTY_TIMELINE = "EMPTY_TIMELINE",
  TIMELINE_WITH_MESSAGES = "TIMELINE_WITH_MESSAGES",
  LOADING_TIMELINE = "LOADING_TIMELINE",
}

export const selectHomeViewModel = (
  rootState: RootState,
  getNow: () => string
) => {
  const now = getNow();
  const timeline = selectUserTimeline("alice-timeline-id", rootState);
  const isUserTimelineLoading = selectIsUserTimelineLoading("Alice", rootState);

  if (isUserTimelineLoading) {
    return {
      timeline: {
        type: HomeViewModelType.LOADING_TIMELINE as HomeViewModelType.LOADING_TIMELINE,
        info: "Loading...",
      },
    };
  }

  if (!timeline) {
    return {
      timeline: {
        type: HomeViewModelType.NO_TIMELINE as HomeViewModelType.NO_TIMELINE,
      },
    };
  }

  if (timeline.messages.length === 0) {
    return {
      timeline: {
        type: HomeViewModelType.EMPTY_TIMELINE as HomeViewModelType.EMPTY_TIMELINE,
        info: "The is no messages yet",
      },
    };
  }

  const messages = selectMessages(timeline.messages, rootState).map(
    (message) => {
      return {
        id: message.id,
        userId: message.author,
        username: message.author,
        profilePictureUrl: `https://picsum.photos/200?random=${message.author}`,
        publishedAt: timeAgo(message.publishedAt, "", { relativeDate: now }),
        text: message.text,
      };
    }
  );

  return {
    timeline: {
      type: HomeViewModelType.TIMELINE_WITH_MESSAGES as HomeViewModelType.TIMELINE_WITH_MESSAGES,
      messages,
    },
  };
};
