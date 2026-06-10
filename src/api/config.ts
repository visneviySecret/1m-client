import { getRequestErrorMessage } from "@/share/lib/getRequestErrorMessage";
import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000",
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(error);
    return Promise.reject(new Error(getRequestErrorMessage(error)));
  }
);
