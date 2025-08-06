import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import AuthProviders from "./Providers/AuthProviders";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProviders>
      <div className="max-w-screen-2xl mx-auto">
        <RouterProvider router={router}></RouterProvider>
        <Toaster />
      </div>
    </AuthProviders>
  </StrictMode>
);
