// import axios from "axios";

// const api = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL,
//   withCredentials: true, // 🔥 required for cookies
// });

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // If access token expired → try refresh
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         // Call refresh endpoint (backend will set new cookies)
//         await api.post("/auth/refresh-token");

//         // Retry original request
//         return api(originalRequest);
//       } catch (refreshError) {
//         // Refresh failed → force logout
//         if (typeof window !== "undefined") {
//           window.location.href = "/auth/signin";
//         }
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;
import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

import { toast } from "sonner";

interface ApiResponse<T = unknown> {
  data?: T;
  message?: string;
  [key: string]: unknown;
}

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  skipToast?: boolean;
  _retry?: boolean;
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

/* ---------------- SUCCESS MESSAGE HELPER ---------------- */

const getSuccessMessage = (method?: string, serverMessage?: string) => {
  if (serverMessage) return serverMessage;

  switch (method) {
    case "post":
      return "Created successfully";

    case "put":
    case "patch":
      return "Updated successfully";

    case "delete":
      return "Deleted successfully";

    default:
      return "Operation successful";
  }
};

/* ---------------- RESPONSE INTERCEPTOR ---------------- */

api.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    const config = response.config as CustomAxiosRequestConfig;

    const method = config.method?.toLowerCase();

    const message = response.data?.message;

    /* Auto success toast */
    if (
      !config.skipToast &&
      !config.url?.includes("login") &&
      !config.url?.includes("refresh-token") &&
      ["post", "put", "patch", "delete"].includes(method ?? "")
    ) {
      toast.success(getSuccessMessage(method, message));
    }

    return response;
  },

  async (error: AxiosError<ApiResponse>) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    /* ---------------- TOKEN REFRESH ---------------- */

    if (error.response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true;

      try {
        await api.post("/auth/refresh-token", {}, {
          skipToast: true,
        } as CustomAxiosRequestConfig);

        return api(originalRequest);
      } catch (refreshError) {
        if (typeof window !== "undefined") {
          window.location.href = "/auth/signin";
        }

        return Promise.reject(refreshError);
      }
    }

    /* ---------------- SKIP TOAST ---------------- */

    if (originalRequest?.skipToast) {
      return Promise.reject(error);
    }

    /* ---------------- NETWORK ERROR ---------------- */

    if (!error.response) {
      toast.error("Network error. Please check your internet connection.");

      return Promise.reject(error);
    }

    /* ---------------- ERROR MESSAGE ---------------- */

    const { status, data } = error.response;

    const errorMessage = data?.message || "Something went wrong";

    switch (status) {
      case 400:
        toast.error(errorMessage || "Invalid request");
        break;

      case 401:
        toast.error(errorMessage || "Unauthorized. Please login again.");
        break;

      case 403:
        toast.error(errorMessage || "You do not have permission.");
        break;

      case 404:
        toast.error(errorMessage || "Resource not found");
        break;

      case 422:
        toast.error(errorMessage || "Validation failed");
        break;

      case 500:
        toast.error(errorMessage || "Server error. Please try again later.");
        break;

      default:
        toast.error(errorMessage);
    }

    return Promise.reject(error);
  },
);

export default api;