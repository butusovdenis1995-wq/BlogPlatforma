import styles from "./ArticleTitle.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { AppRoute, getRouteArticle } from "@/shared/config/route";
import ButtonLike from "@/shared/ui/ButtonLike/ButtonLike";
import { ArticleT } from "../types/types";
import { formatDate } from "@/shared/utils/formatDate";
import Tag from "@/shared/ui/Tags/Tags";
import { Spin } from "antd";
import Logo from "../../../../public/Rectangle.png";
import { isAuthorized } from "@/shared/utils/isAuthorized";
import Button from "@/shared/ui/Button/Button";
import { isAuthorArticle } from "@/shared/utils/authorArticle";
import { useDispatch } from "react-redux";
import { setForm } from "@/features/AddArticle/articleFormSlice";
import { IArticleRequestT } from "@/features/AddArticle/types";
import { useState } from "react";
import ModalDeletedArticle from "@/shared/ui/ModalDeletedArticle/ModalDeletedArticle";

interface ArticleTitleProps {
  article: ArticleT | undefined;
  showActions?: boolean;
}

export default function ArticleTitle({
  article,
  showActions = false,
}: ArticleTitleProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function setStateFormArticle(article: ArticleT | undefined) {
    if (!article) return;

    const formData: IArticleRequestT = {
      title: article.title,
      description: article.description,
      body: article.body,
      tagList: article.tagList,
    };
    dispatch(setForm(formData));
    navigate(AppRoute.AddArticle, {
      state: { path: "Editing", slug: article?.slug },
    });
  }

  if (!article) {
    return (
      <div className={styles.articleWrapper}>
        <Spin size="large" className={styles.spin} />
      </div>
    );
  }

  return (
    <div className={styles.articleWrapper}>
      <div>
        <div className={styles.blockTitle}>
          <Link className={styles.title} to={getRouteArticle(article.slug)}>
            {article.title}
          </Link>
          <ButtonLike
            quantityLike={article.favoritesCount}
            slug={article.slug}
          />
        </div>
        {article.tagList.map((tag) => (
          <Tag key={tag} tag={tag} />
        ))}
        <br />
        <span className={styles.articleText}>{article.description}</span>
      </div>
      <div>
        <span className={styles.authorName}>{article.author.username}</span>
        <br />
        <span className={styles.date}>{formatDate(article.createdAt)}</span>
      </div>
      <img src={Logo} alt="Author" />
      {isAuthorized() &&
        isAuthorArticle(article?.author.username) &&
        showActions && (
          <div className={styles.button}>
            <Button
              onClick={() => setIsOpen(true)}
              className={styles.buttonDelete}
            >
              Delete
            </Button>
            <Button
              onClick={() => setStateFormArticle(article)}
              className={styles.buttonEdit}
            >
              Edit
            </Button>
          </div>
        )}
      <ModalDeletedArticle
        isOpen={isOpen}
        slug={article.slug}
        setIsOpen={setIsOpen}
      />
    </div>
  );
}
