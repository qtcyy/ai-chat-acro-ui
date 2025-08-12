import { RouteObject } from "react-router-dom";
import { TestHome } from "../page/home/TestHome";

export const routes: RouteObject[] = [
  {
    path: "/",
    // test page
    element: <TestHome />,
  },
];
