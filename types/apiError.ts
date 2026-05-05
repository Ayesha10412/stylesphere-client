export type ZodErrorItem = {
  path: (string | number)[];
  message: string;
};

export type ApiErrorResponse = {
  success: false;
  message: string;
  errorSources?: ZodErrorItem[];
};