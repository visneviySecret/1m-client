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

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
}
