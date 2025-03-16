import { resolve } from "path";
import {
  GetUserTimelineResponse,
  TimelineGateway,
} from "../model/TimelineGateway";

export class FakeTimelineGateway implements TimelineGateway {
  constructor(private readonly delay = 0) {}

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
    return new Promise((resolve, reject) => {
      return setTimeout(() => {
        const timeline = this.timelineByUser.get(userId);

        if (!timeline) {
          return reject();
        }

        return resolve({ timeline });
      }, this.delay);
    });
  }
}
