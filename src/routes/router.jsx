import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import ErrorPage from "@/component/ErrorPage/ErrorPage";
import SignUp from "../component/SignUp/SignUp";
import Home from "../component/Home/Home";
import Login from "../component/Login/Login";
import ManageUsers from "../pages/AdminDashboard/ManageUsers";
import Dashboard from "../layouts/Dashboard";
import SellerSignUp from "../pages/SellerSignUp";
import ManageSellers from "../pages/AdminDashboard/ManageSellers";
import PrivateRoutes from "./PrivateRoutes";
import AdminRoutes from "./AdminRoutes";
import AdminProfile from "../pages/AdminDashboard/AdminProfile";
import ManageSellerProfile from "../pages/SellerDashboard/ManageSellerProfile";
import SellerRoutes from "./SellerRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/signUp",
        element: <SignUp></SignUp>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "dashboard",
        element: (
          <PrivateRoutes>
            <Dashboard></Dashboard>
          </PrivateRoutes>
        ),
        children: [
          {
            path: "adminProfile",
            element: (
              <AdminRoutes>
                <AdminProfile></AdminProfile>
              </AdminRoutes>
            ),
          },
          {
            path: "users",
            element: (
              <AdminRoutes>
                <ManageUsers></ManageUsers>
              </AdminRoutes>
            ),
          },
          {
            path: "manageSeller",
            element: (
              <AdminRoutes>
                <ManageSellers></ManageSellers>
              </AdminRoutes>
            ),
          },
          {
            path: "sellerProfile",
            element: (
              <SellerRoutes>
                <ManageSellerProfile></ManageSellerProfile>
              </SellerRoutes>
            ),
          },
        ],
      },
      {
        path: "/joinAsSeller",
        element: <SellerSignUp></SellerSignUp>,
      },
      {
        path: "*",
        element: <ErrorPage></ErrorPage>,
      },
    ],
  },
]);
export default router;
