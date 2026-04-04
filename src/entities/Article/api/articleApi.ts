import { baseApi } from "@/shared/api/baseApi";
import { Articles } from "../types/types";

interface GetArticlesParams {
  offset: number;
  limit: number;
}

export const articleApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getArticles: build.query<Articles, GetArticlesParams>({
      query: (params: GetArticlesParams) => {
        const { offset = 0, limit = 5 } = params;
        return {
          url: "/articles",
          params: { offset, limit },
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.articles.map(
                ({ slug }) => ({ type: "Articles", id: slug }) as const,
              ),
              { type: "Articles", id: "LIST" },
            ]
          : [{ type: "Articles", id: "LIST" }],
      keepUnusedDataFor: 7200,
    }),
  }),
});

export const { useGetArticlesQuery } = articleApi;
