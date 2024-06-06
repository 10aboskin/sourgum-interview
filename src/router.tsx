import Root from "./pages/root.page";
import { createBrowserRouter } from "react-router-dom";

export const routes = [
  {
    path: "/:assetId?",
    element: <Root />,
  },
];

const router = createBrowserRouter(routes);

export default router;
