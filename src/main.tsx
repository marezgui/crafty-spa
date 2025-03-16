import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from './Provider';
import { createStore } from './lib/createStore';
import { FakeAuthGateway } from './lib/auth/infra/FakeAuthGateway';
import { FakeTimelineGateway } from './lib/timelines/infra/FakeTimelineGateway';
import { createRouter } from './router';

const authGateway = new FakeAuthGateway();
authGateway.authUser = "Alice";

const timelineGateway = new FakeTimelineGateway(1000);
timelineGateway.timelineByUser.set(authGateway.authUser, {
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

const root = document.getElementById("root");
const store = createStore({
  authGateway,
  timelineGateway
})
const router = createRouter({ store })

ReactDOM.createRoot(root as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store} router={router} />
  </React.StrictMode>
);
