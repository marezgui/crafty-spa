import { RouterProvider } from "react-router";
import { router } from "./router";

export const Provider = () => (
  <RouterProvider router={router} />
);