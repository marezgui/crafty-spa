import {
  GetUserTimelineResponse,
  TimelineGateway,
} from "../model/TimelineGateway";

export class FakeTimelineGateway implements TimelineGateway {
  timelineByUser = new Map<
    string,
    {
      id: string;
      user: string;
      messages: {
        id: string;
        text: string;
        author: string;
        publishedAt: string;
      }[];
    }
  >();

  getUserTimeline({
    userId,
  }: {
    userId: string;
  }): Promise<GetUserTimelineResponse> {
    const timeline = this.timelineByUser.get(userId);

    if (!timeline) {
      return Promise.reject();
    }

    return Promise.resolve({ timeline });
  }
}
