import WrapperCard from "@/shared/ui/WrapperCard";
import Form from "@/shared/ui/WrapperForm";
import styles from "./FormAddArticle.module.scss";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAddArticle } from "./useAddArticle";
import { IFormAddArticleT } from "./types";
import { Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/shared/config/store";
import { useLocation } from "react-router-dom";
import { addTag, clearForm, deleteTag } from "./articleFormSlice";

export default function FormAddArticle() {
  const location = useLocation();
  const formValue = useSelector((state: RootState) => state.articleForm);
  const dispatch = useDispatch();
  const [currentTag, setCurrentTag] = useState<string>("");
  const [duplicated, setDuplicated] = useState(false);

  const modeForm = location.state.path;
  const slug = location.state.slug;

  useEffect(() => {
    if (modeForm === "Create") {
      console.log("dispatch");
      dispatch(clearForm());
    }
  }, [modeForm, dispatch]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IFormAddArticleT>({
    values: {
      title: formValue.title,
      description: formValue.description,
      body: formValue.body,
    },
  });

  function addTags() {
    if (currentTag.trim()) {
      if (!formValue.tagList.includes(currentTag.trim())) {
        console.log(currentTag);
        dispatch(addTag(currentTag));
        setCurrentTag("");
        setDuplicated(false);
      } else {
        setDuplicated(true);
      }
    }
  }

  function removeTag(id: string) {
    dispatch(deleteTag(id));
  }

  const { onSubmit, isLoading } = useAddArticle(
    formValue.tagList,
    reset,
    modeForm,
    slug,
  );

  return (
    <WrapperCard className={styles.addArticleWrapper}>
      {isLoading ? (
        <Spin size="large" />
      ) : (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <p>{modeForm === "Create" ? "Create new article" : "Edit article"}</p>
          <label htmlFor="title">
            Title
            <input
              id="title"
              className={styles.inputTitle}
              type="text"
              placeholder="Title"
              {...register("title", {
                required: true,
              })}
            />
          </label>
          {errors.title && <span>Обязательное поле</span>}
          <label htmlFor="description">
            Short description
            <input
              id="description"
              className={styles.inputTitle}
              type="text"
              placeholder="description"
              {...register("description", {
                required: true,
              })}
            />
          </label>
          {errors.description && <span>Обязательное поле</span>}
          <label htmlFor="text">
            Text
            <textarea
              id="text"
              className={styles.textarea}
              placeholder="Text"
              {...register("body", {
                required: true,
              })}
            />
          </label>
          {errors.body && <span>Обязательное поле</span>}

          <label>Tag</label>
          {formValue.tagList.map((tag) => {
            return (
              <div key={tag} className={styles.listTags}>
                <span className={styles.tags}>{tag}</span>
                <button
                  onClick={() => removeTag(tag)}
                  className={styles.delete}
                >
                  Delete
                </button>
              </div>
            );
          })}
          <div className={styles.listTags}>
            <input
              onChange={(e) => setCurrentTag(e.target.value)}
              className={styles.inputTags}
              type="text"
              value={currentTag}
            />
            {duplicated && (
              <span className={styles.duplicatedWarning}>
                Такой тег уже существует!
              </span>
            )}
            <button type="button" onClick={addTags} className={styles.addTags}>
              Add tag
            </button>
          </div>

          <button className={styles.send} type="submit">
            Send
          </button>
        </Form>
      )}
    </WrapperCard>
  );
}
