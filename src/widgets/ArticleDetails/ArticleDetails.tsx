import WrapperCard from "@/shared/ui/WrapperCard";
import styles from "./ArticleDetails.module.scss";
import { ArticleT } from "@/entities/Article/types/types";
import ArticleTitle from "@/entities/Article/ui/ArticleTitle";

export default function ArticleDetails({ article }: { article?: ArticleT }) {
  return (
    <WrapperCard className={styles.articleWrapper}>
      <ArticleTitle article={article} showActions={true} />
      <p>{article?.title}</p>
      <br />
      <div className={styles.body}>{article?.body}</div>
    </WrapperCard>
  );
}
