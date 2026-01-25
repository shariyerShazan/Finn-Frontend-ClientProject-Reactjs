import { createBrowserRouter } from "react-router-dom";
import ParentLayout from "../ParentLayout/ParentLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ParentLayout />,
    children: [],
  },
]);
