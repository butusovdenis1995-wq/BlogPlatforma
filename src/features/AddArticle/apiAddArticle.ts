import { baseApi } from "@/shared/api/baseApi";
import { getCookie } from "@/shared/utils/authToken";

const apiAddArticle = baseApi.injectEndpoints({
  endpoints: (build) => ({
    postAddArticle: build.mutation({
      query: (article) => ({
        url: "/articles",
        method: "POST",
        body: article,
        headers: {
          Authorization: `Bearer ${getCookie().authToken}`,
        },
      }),
      invalidatesTags: [{ type: "Articles", id: "LIST" }],
    }),
  }),
});

export const { usePostAddArticleMutation } = apiAddArticle;
