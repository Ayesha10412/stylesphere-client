
import { createBrowserRouter } from "react-router-dom";

import DashboardLayout from "../layouts/dashboard/DashboardLayout";
import { dashboardRoutes } from "./dashboardRoute";
import RoleRoute from "./RoleRoute";
import Home from "../component/Home/Home";
import Login from "../component/Authentication/Login/Login";
import SignUp from "../component/Authentication/SignUp/SignUp";

const router = createBrowserRouter([
      {
    path: "/",
    element: <Home />,
      },
 {
    path: "/login",
    element: <Login />,
  },
      {
    path: "/signup",
    element: <SignUp />,
  },
    
     
  {

    path: "/dashboard",
    element: <DashboardLayout />,
    children: dashboardRoutes.map((route) => {
      const Component = route.component;

      return {
        path: route.path,
        element: (
          <RoleRoute allowedRoles={route.roles}>
            <Component />
          </RoleRoute>
        ),
      };
    }),
  },
]);

export default router;
