import { createStore } from "../../createStore";
import { describe, it, expect } from "vitest";
import { getAuthUserTimeline } from "../usecases/getAuthUserTimeline.usecase";
import { FakeTimelineGateway } from "../infra/FakeTimelineGateway";
import { FakeAuthGateway } from "@/lib/auth/infra/FakeAuthGateway";
import { selectUserTimeline } from "../slices/timelimesSlice";
import { selectMessage } from "../slices/messagesSlice";

describe("Feat : Retrieving authenticated user's timeline", () => {
  it("Example : Alice is authenticated and can see her timeline", async () => {
    givenAthenticatedUserIs("Alice");

    givenExistingTimeline({
      id: "alice-timeline-id",
      user: "Alice",
      messages: [
        {
          id: "msg1-id",
          text: "Hello it's Bob",
          author: "Bob",
          publishedAt: "2025-10-03T12:06:00.000Z",
        },
        {
          id: "msg2-id",
          text: "hello it's Alice",
          author: "Alice",
          publishedAt: "2025-10-03T12:12:00.000Z",
        },
      ],
    });

    await whenRetrievingAuthenticatedUserTimeline();

    thenTheReceivedTimelineShouldBe({
      id: "alice-timeline-id",
      user: "Alice",
      messages: [
        {
          id: "msg1-id",
          text: "Hello it's Bob",
          author: "Bob",
          publishedAt: "2025-10-03T12:06:00.000Z",
        },
        {
          id: "msg2-id",
          text: "hello it's Alice",
          author: "Alice",
          publishedAt: "2025-10-03T12:12:00.000Z",
        },
      ],
    });
  });
});

const authGateway = new FakeAuthGateway();
const timelineGateway = new FakeTimelineGateway();
const store = createStore({
  authGateway,
  timelineGateway,
});

function givenAthenticatedUserIs(user: string) {
  authGateway.authUser = user;
}

function givenExistingTimeline(timeline: {
  id: string;
  user: string;
  messages: {
    id: string;
    text: string;
    author: string;
    publishedAt: string;
  }[];
}) {
  timelineGateway.timelineByUser.set("Alice", timeline);
}

async function whenRetrievingAuthenticatedUserTimeline() {
  await store.dispatch(getAuthUserTimeline());
}

function thenTheReceivedTimelineShouldBe(expectedTimeline: {
  id: string;
  user: string;
  messages: {
    id: string;
    text: string;
    author: string;
    publishedAt: string;
  }[];
}) {
  const authUserTimeline = selectUserTimeline(
    expectedTimeline.id,
    store.getState()
  );
  expect(authUserTimeline).toEqual({
    id: expectedTimeline.id,
    user: expectedTimeline.user,
    messages: expectedTimeline.messages.map((m) => m.id),
  });
  expectedTimeline.messages.forEach((message) => {
    expect(selectMessage(message.id, store.getState())).toEqual(message);
  });
}
