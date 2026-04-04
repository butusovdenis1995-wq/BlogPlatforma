import { baseApi } from "@/shared/api/baseApi";
import { FormData, RegistrationResponse } from "./types";

export const apiRegistration = baseApi.injectEndpoints({
  endpoints: (build) => ({
    postRegistration: build.mutation<RegistrationResponse, FormData>({
      query: (user) => ({
        url: "/users",
        method: "POST",
        body: { user },
      }),
    }),
  }),
});

export const { usePostRegistrationMutation } = apiRegistration;
