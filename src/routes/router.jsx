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
        path: "/dashboard",
        element: <Dashboard></Dashboard>,
      },
      {
        path: "/joinAsSeller",
        element: <SellerSignUp></SellerSignUp>,
      },
      {
        path: "/manageSeller",
        element: <ManageSellers></ManageSellers>,
      },
      {
        path: "/users",
        element: <ManageUsers></ManageUsers>,
      },
      {
        path: "*",
        element: <ErrorPage></ErrorPage>,
      },
    ],
  },
]);
export default router;
