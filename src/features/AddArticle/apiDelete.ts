import { baseApi } from "@/shared/api/baseApi";
import { getCookie } from "@/shared/utils/authToken";

export const deleteArticleApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    deleteArticle: build.mutation({
      query: (slug) => ({
        url: `/articles/${slug}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getCookie().authToken}`,
        },
      }),
      invalidatesTags: [{ type: "Articles", id: "LIST" }],
    }),
  }),
});

export const { useDeleteArticleMutation } = deleteArticleApi;
