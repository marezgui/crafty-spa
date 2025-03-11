import { createTestStore } from "@/lib/createStore";
import { describe, test, expect } from "vitest";
import { selectHomeViewModel } from "../homeViewModel";

describe("HomeViewModel", () => {
  test("Example: there is no timeline in the store", () => {
    const store = createTestStore();
    const homeViewModel = selectHomeViewModel(store.getState());

    expect(homeViewModel).toEqual({
      timeline: {
        type: "NO_TIMELINE",
      },
    });
  });

  test("Example: there is no message in the timeline", () => {
    const store = createTestStore(
      {},
      {
        timelines: {
          ids: ["alice-timeline-id"],
          entities: {
            "alice-timeline-id": {
              id: "alice-timeline-id",
              messages: [],
              user: "Alice",
            },
          },
        },
      }
    );
    const homeViewModel = selectHomeViewModel(store.getState());

    expect(homeViewModel).toEqual({
      timeline: {
        type: "EMPTY_TIMELINE",
        info: "The is no messages yet",
      },
    });
  });

  test("Example: there is one message in the timeline", () => {
    const store = createTestStore(
      {},
      {
        timelines: {
          ids: ["alice-timeline-id"],
          entities: {
            "alice-timeline-id": {
              id: "alice-timeline-id",
              messages: ["msg1-id"],
              user: "Alice",
            },
          },
        },
        messages: {
          ids: [],
          entities: {
            "msg1-id": {
              id: "msg1-id",
              author: "Bob",
              text: "Hi it's Bob !",
              publishedAt: "2025-11-03T15:00:00.000Z",
            },
          },
        },
      }
    );
    const homeViewModel = selectHomeViewModel(store.getState());

    expect(homeViewModel).toEqual({
      timeline: {
        type: "TIMELINE_WITH_MESSAGES",
        messages: [
          {
            id: "msg1-id",
            userId: "Bob",
            username: "Bob",
            profilePictureUrl: "https://picsum.photos/200?random=Bob",
            text: "Hi it's Bob !",
            publishedAt: "2025-11-03T15:00:00.000Z",
          },
        ],
      },
    });
  });

  test("Example: there is N message in the timeline", () => {
    const store = createTestStore(
      {},
      {
        timelines: {
          ids: ["alice-timeline-id"],
          entities: {
            "alice-timeline-id": {
              id: "alice-timeline-id",
              messages: ["msg1-id", "msg2-id", "msg3-id"],
              user: "Alice",
            },
          },
        },
        messages: {
          ids: [],
          entities: {
            "msg1-id": {
              id: "msg1-id",
              author: "Bob",
              text: "Hi it's Bob !",
              publishedAt: "2025-11-03T15:00:00.000Z",
            },
            "msg2-id": {
              id: "msg2-id",
              author: "Alice",
              text: "Hi Bob !",
              publishedAt: "2025-11-03T15:10:00.000Z",
            },
            "msg3-id": {
              id: "msg3-id",
              author: "Charles",
              text: "I'am Charles !",
              publishedAt: "2025-11-03T15:10:00.000Z",
            },
          },
        },
      }
    );
    const homeViewModel = selectHomeViewModel(store.getState());

    expect(homeViewModel).toEqual({
      timeline: {
        type: "TIMELINE_WITH_MESSAGES",
        messages: [
          {
            id: "msg1-id",
            userId: "Bob",
            username: "Bob",
            profilePictureUrl: "https://picsum.photos/200?random=Bob",
            text: "Hi it's Bob !",
            publishedAt: "2025-11-03T15:00:00.000Z",
          },
          {
            id: "msg2-id",
            userId: "Alice",
            username: "Alice",
            profilePictureUrl: "https://picsum.photos/200?random=Alice",
            text: "Hi Bob !",
            publishedAt: "2025-11-03T15:10:00.000Z",
          },
          {
            id: "msg3-id",
            userId: "Charles",
            username: "Charles",
            profilePictureUrl: "https://picsum.photos/200?random=Charles",
            text: "I'am Charles !",
            publishedAt: "2025-11-03T15:10:00.000Z",
          },
        ],
      },
    });
  });
});
