import { baseApi } from "@/shared/api/baseApi";

export const deleteArticleApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    deleteArticle: build.mutation({
      query: (slug) => ({
        url: `/articles/${slug}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Articles", id: "LIST" }],
    }),
  }),
});

export const { useDeleteArticleMutation } = deleteArticleApi;
