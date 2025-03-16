import { createBrowserRouter } from "react-router";
import { Home } from "./pages/home/Home";
import { Layout } from "./pages/Layout";
import { createHomeloader } from "./pages/home/createHomeLoader";
import { AppStore } from "./lib/createStore";

export const createRouter = ({ store }: { store: AppStore }) =>
  createBrowserRouter([
    {
      path: "/",
      Component: Layout,
      children: [
        {
          index: true,
          Component: Home,
          loader: createHomeloader({ store }),
        },
      ],
    },
  ]);

export type AppRouter = ReturnType<typeof createRouter>;
