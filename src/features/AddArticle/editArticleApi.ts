import { baseApi } from "@/shared/api/baseApi";
import { getCookie } from "@/shared/utils/authToken";

export const editArticleApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    editArticle: build.mutation({
      query: ({ article, slug }) => ({
        url: `/articles/${slug}`,
        method: "PUT",
        body: article,
        headers: {
          Authorization: `Bearer ${getCookie().authToken}`,
        },
      }),
      invalidatesTags: [{ type: "Articles", id: "LIST" }],
    }),
  }),
});

export const { useEditArticleMutation } = editArticleApi;
