// import { FieldValues, FieldPath, UseFormSetError } from "react-hook-form";

// type ZodErrorItem = {
//   path: (string | number)[];
//   message: string;
// };

// type ApiErrorResponse = {
//   message?: string;
//   errorSources?: ZodErrorItem[];
// };

// type ApiError = {
//   response?: {
//     data?: ApiErrorResponse;
//   };
// };

// export const handleApiError = <T extends FieldValues>(
//   error: unknown,
//   setError: UseFormSetError<T>,
// ) => {
//   const err = error as ApiError;
//   const response = err?.response?.data;

//   if (!response) return;

//   // ✅ only handle field errors if they exist
//   if (
//     Array.isArray(response.errorSources) &&
//     response.errorSources.length > 0
//   ) {
//     response.errorSources.forEach((errItem) => {
//       const field = errItem.path?.[0] as FieldPath<T>;

//       if (field) {
//         setError(field, {
//           type: "server",
//           message: errItem.message,
//         });
//       }
//     });
//     return;
//   }

//   // ✅ fallback: show general message
//   if (typeof response.message === "string") {
//     try {
//       const parsed = JSON.parse(response.message);

//       if (Array.isArray(parsed)) {
//         parsed.forEach((errItem: ZodErrorItem) => {
//           const field = errItem.path?.[0] as FieldPath<T>;

//           if (field) {
//             setError(field, {
//               type: "server",
//               message: errItem.message,
//             });
//           }
//         });
//         return;
//       }
//     } catch {
//       // not JSON → normal message
//     }

//     // ✅ THIS is what will now run
//     setError("root" as FieldPath<T>, {
//       type: "server",
//       message: response.message,
//     });
//   }
// };
import {
  FieldValues,
  FieldPath,
  UseFormSetError,
  PathValue,
} from "react-hook-form";

type ZodErrorItem = {
  path: (string | number)[];
  message: string;
};

type ApiErrorResponse = {
  message?: string;
  errorSources?: ZodErrorItem[];
};

type ApiError = {
  response?: {
    data?: ApiErrorResponse;
  };
};

export const handleApiError = <T extends FieldValues>(
  error: unknown,
  setError: UseFormSetError<T>,
) => {
  const err = error as ApiError;
  const response = err?.response?.data;

  if (!response) return;

  if (Array.isArray(response.errorSources) && response.errorSources.length) {
    response.errorSources.forEach((errItem) => {
      const field = errItem.path?.join(".") as FieldPath<T>;
      if (field) {
        setError(field, {
          type: "server",
          message: errItem.message,
        });
      }
    });
    return;
  }

  if (typeof response.message === "string") {
    setError("root" as FieldPath<T>, {
      type: "server",
      message: response.message,
    });
  }
};
