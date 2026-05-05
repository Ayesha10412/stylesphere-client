/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, FieldPath, UseFormSetError } from "react-hook-form";
type ZodErrorItem = {
  path: (string | number)[];
  message: string;
};

export const handleApiError = <T extends FieldValues>(
  error: any,
  setError: UseFormSetError<T>
) => {
  const response = error?.response?.data;

  if (!response) return;

  if (response.errorSources && Array.isArray(response.errorSources)) {
    response.errorSources.forEach((err: ZodErrorItem) => {
      const field = err.path?.[0] as FieldPath<T>;

      if (field) {
        setError(field, {
          type: "server",
          message: err.message,
        });
      }
    });

    return;
  }

  if (typeof response.message === "string") {
    try {
      const parsed = JSON.parse(response.message);

      if (Array.isArray(parsed)) {
        parsed.forEach((err: ZodErrorItem) => {
          const field = err.path?.[0] as FieldPath<T>;

          if (field) {
            setError(field, {
              type: "server",
              message: err.message,
            });
          }
        });
      }
    } catch {
      setError("root" as any, {
        message: response.message,
      });
    }
  }
};