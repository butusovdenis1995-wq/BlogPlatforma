import { baseApi } from "@/shared/api/baseApi";

import { IAuthResponse, IUserAuth } from "./types";

export const apiAuth = baseApi.injectEndpoints({
  endpoints: (build) => ({
    postAuth: build.mutation<IAuthResponse, IUserAuth>({
      query: (user) => ({
        url: "/users/login",
        method: "POST",
        body: { user },
      }),
    }),
  }),
});

export const { usePostAuthMutation } = apiAuth;
