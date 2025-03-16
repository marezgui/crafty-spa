import { RouterProvider } from "react-router";
import { Provider as ReduxProvider} from 'react-redux'
import { AppRouter } from "./router";
import { AppStore } from "./lib/createStore";

export const Provider = ({ store, router }: { store: AppStore, router: AppRouter }) => (
  <ReduxProvider store={store}>
    <RouterProvider router={router} />
  </ReduxProvider>
);