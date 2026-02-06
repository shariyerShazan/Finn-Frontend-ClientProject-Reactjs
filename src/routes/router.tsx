import { createBrowserRouter } from "react-router-dom";
import ParentLayout from "../Layouts/ParentLayout";
import SignUp from "../AuthLayout/SignUp/SignUp";
import Login from "../AuthLayout/Login/Login";
import RegistrationDone from "../AuthLayout/RegistrationDone/RegistrationDone";
import UserDashboardLayout from "../Layouts/UserDashboardLayout";
import UserProfile from "../UserDashboard/UserProfile/UserProfile";
import UserChatbox from "../UserDashboard/UserChatbox/UserChatbox";
import ChangePassword from "../UserDashboard/ChangePassword/ChangePassword";
import SellerDetails from "../AuthLayout/SellerDetails/SellerDetails";
// import VerifyOtp from "@/AuthLayout/SignUp/_components/verifyOtp";
import VerifyRegisterOtp from "@/AuthLayout/SignUp/_components/verifyOtp";
import ForgotPassword from "@/AuthLayout/ForgotPassword/ForgotPassword";
import HomePage from "@/main/user/Pages/HomePage/HomePage";
import SearchPage from "@/main/user/Pages/SearchPage/SearchPage";
import ItemDetailsPage from "@/main/user/Pages/ItemDetailsPage/ItemDetailsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ParentLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "register",
        element: <SignUp />,
      },
      {
        path: "forgot-password" ,
        element: <ForgotPassword />
      },
      {
        path: "verify-otp",
        element: <VerifyRegisterOtp />
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

      {
        path: "item-details/:id",
        element: <ItemDetailsPage />,
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
