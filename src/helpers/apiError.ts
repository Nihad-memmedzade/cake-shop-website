import axios from "axios";

type ApiValidationError = {
  msg?: string;
};

type ApiErrorResponse = {
  detail?: string | ApiValidationError[];
};

export const getApiErrorMessage = (error: unknown, fallback: string) => {
  if (!axios.isAxiosError<ApiErrorResponse>(error)) {
    return fallback;
  }

  const detail = error.response?.data?.detail;

  if (typeof detail === "string") {
    return detail;
  }

  if (Array.isArray(detail)) {
    const validationMessage = detail
      .map((item) => item.msg)
      .filter(Boolean)
      .join(" ");

    return validationMessage || fallback;
  }

  return fallback;
};
