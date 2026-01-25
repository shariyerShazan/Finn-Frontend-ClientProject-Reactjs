import { createBrowserRouter } from "react-router-dom";
import ParentLayout from "../ParentLayout/ParentLayout";
import SignUp from "../AuthLayout/SignUp/SignUp";
import Login from "../AuthLayout/Login/Login";
import RegistrationDone from "../AuthLayout/RegistrationDone/RegistrationDone";
import UserDashboardLayout from "../UserDashboard/UserDashboardLayout";
import UserProfile from "../UserDashboard/UserProfile/UserProfile";
import UserChatbox from "../UserDashboard/UserChatbox/UserChatbox";
import ChangePassword from "../UserDashboard/ChangePassword/ChangePassword";
import SellerDetails from "../AuthLayout/SellerDetails/SellerDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ParentLayout />,
    children: [
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "login",
        element: <Login />,
      },
      //   if the role is seller navigate to this below route
      {
        path: "registration-done",
        element: <RegistrationDone />,
      },
      {
        path: "seller-details",
        element: <SellerDetails />,
      },
      {
        path: "user-profile",
        element: <SignUp />,
      },
      // if the role is user then show user dashboard layout after login or signup ..............User Dashboard Routes
      {
        path: "user-dashboard",
        element: <UserDashboardLayout />,
        children: [
          {
            index: true,
            element: <UserProfile />,
          },
          {
            path: "user-chatbox",
            element: <UserChatbox />,
          },
          {
            path: "change-password",
            element: <ChangePassword />,
          },
        ],
      },
    ],
  },
]);
