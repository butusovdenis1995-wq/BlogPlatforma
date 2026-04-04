import { articleApi } from "@/entities/Article/api/articleApi";
import ArticleTitle from "@/entities/Article/ui/ArticleTitle";
import PaginationWrapper from "@/shared/ui/Pagination/Pagination";
import WrapperCard from "@/shared/ui/WrapperCard";
import styles from "./ListArticles.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "@/shared/config/store";
import { Spin } from "antd";

const limit = 5;

export default function ListArticles() {
  const currentPage = useSelector(
    (state: RootState) => state.pagination.currentPage,
  );
  const { data, isLoading, isError } = articleApi.useGetArticlesQuery({
    offset: (currentPage - 1) * limit,
    limit,
  });

  if (isLoading) {
    return <Spin size="large" />;
  }
  if (isError) {
    <div>ошибка загрузки статей</div>;
  }
  return (
    <>
      {data?.articles.map((article) => (
        <WrapperCard key={article.slug} className={styles.articleWrapper}>
          <ArticleTitle article={article} />
        </WrapperCard>
      ))}
      <PaginationWrapper articlesCount={data?.articlesCount} />
    </>
  );
}
