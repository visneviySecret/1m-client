import axios from "axios";

export function getRequestErrorMessage(
  error: unknown,
  fallback = "Request failed"
) {
  if (typeof error === "string") return error;

  if (axios.isAxiosError(error)) {
    const responseError = error.response?.data;

    if (
      typeof responseError === "object" &&
      responseError !== null &&
      "error" in responseError &&
      typeof responseError.error === "string"
    ) {
      return responseError.error;
    }
  }

  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof error.message === "string" &&
    error.message
  ) {
    return error.message;
  }

  return fallback;
}
