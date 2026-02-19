
import { createBrowserRouter } from "react-router-dom";

import DashboardLayout from "../layouts/dashboard/DashboardLayout";
import { dashboardRoutes } from "./dashboardRoute";
import RoleRoute from "./RoleRoute";

const router = createBrowserRouter([
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
