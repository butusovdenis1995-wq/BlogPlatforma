import { useGetArticlesQuery } from "@/entities/Article/api/articleApi";
import ArticleDetails from "@/widgets/ArticleDetails/ArticleDetails";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "@/shared/config/store";

const limit = 5;
export default function ArticlePage() {
  const { id } = useParams();
  const currentPage = useSelector(
    (state: RootState) => state.pagination.currentPage,
  );
  const { data } = useGetArticlesQuery({
    offset: (currentPage - 1) * limit,
    limit,
  });
  const article = data?.articles.find((article) => article.slug === id);

  return (
    <>
      <ArticleDetails article={article} />
    </>
  );
}
