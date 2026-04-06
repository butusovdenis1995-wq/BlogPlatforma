import { baseApi } from "@/shared/api/baseApi";

const apiAddArticle = baseApi.injectEndpoints({
  endpoints: (build) => ({
    postAddArticle: build.mutation({
      query: (article) => ({
        url: "/articles",
        method: "POST",
        body: article,
      }),
      invalidatesTags: [{ type: "Articles", id: "LIST" }],
    }),
  }),
});

export const { usePostAddArticleMutation } = apiAddArticle;
