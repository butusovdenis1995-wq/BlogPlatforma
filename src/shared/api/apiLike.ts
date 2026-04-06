import { baseApi } from "@/shared/api/baseApi";
import { getCookie } from "../utils/authToken";

export const apiLike = baseApi.injectEndpoints({
  endpoints: (build) => ({
    postLike: build.mutation({
      query: (slug) => ({
        url: `/articles/${slug}/favorite`,
        method: "POST",
      }),
      invalidatesTags: [{ type: "Articles", id: "LIST" }],
    }),
    deleteLike: build.mutation({
      query: (slug) => ({
        url: `/articles/${slug}/favorite`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getCookie().authToken}`,
        },
        body: {},
      }),
      invalidatesTags: [{ type: "Articles", id: "LIST" }],
    }),
  }),
});

export const { usePostLikeMutation, useDeleteLikeMutation } = apiLike;
