import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from "../utils/authToken";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://blog-platform.kata.academy/api",
    prepareHeaders: (headers, { endpoint }) => {
      if (endpoint !== "postRegistration") {
        const token = getCookie().authToken;
        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }
      }
    },
  }),
  tagTypes: ["Articles", "Article", "Like"],
  endpoints: () => ({}),
});
