import { baseApi } from "@/shared/api/baseApi";

export const editProfileApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    editProfile: build.mutation({
      query: (user) => ({
        url: "/user",
        method: "PUT",
        body: user,
      }),
    }),
  }),
});

export const { useEditProfileMutation } = editProfileApi;
