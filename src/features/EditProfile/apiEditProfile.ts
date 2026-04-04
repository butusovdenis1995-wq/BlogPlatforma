import { baseApi } from "@/shared/api/baseApi";
import { getCookie } from "@/shared/utils/authToken";

export const editProfileApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    editProfile: build.mutation({
      query: (user) => ({
        url: "/user",
        method: "PUT",
        body: user,
        headers: {
          Authorization: `Bearer ${getCookie().authToken}`,
        },
      }),
    }),
  }),
});

export const { useEditProfileMutation } = editProfileApi;
