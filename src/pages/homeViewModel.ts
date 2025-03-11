import { RootState } from "@/lib/createStore";
import { selectMessages } from "@/lib/timelines/slices/messagesSlice";
import { selectUserTimeline } from "@/lib/timelines/slices/timelimesSlice";

export const selectHomeViewModel = (rootState: RootState) => {
  const timeline = selectUserTimeline("alice-timeline-id", rootState);

  if (!timeline) {
    return {
      timeline: {
        type: "NO_TIMELINE",
      },
    };
  }

  if (timeline.messages.length === 0) {
    return {
      timeline: {
        type: "EMPTY_TIMELINE",
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
        publishedAt: message.publishedAt,
        text: message.text,
      };
    }
  );

  return {
    timeline: {
      type: "TIMELINE_WITH_MESSAGES",
      messages,
    },
  };
};
