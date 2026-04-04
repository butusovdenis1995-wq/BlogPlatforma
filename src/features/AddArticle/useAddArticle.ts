import { useNavigate } from "react-router-dom";
import { usePostAddArticleMutation } from "./apiAddArticle";
import { IFormAddArticleT } from "./types";
import { AppRoute } from "@/shared/config/route";
import { UseFormReset } from "react-hook-form";
import { useEditArticleMutation } from "./editArticleApi";
import {
  apiResponseError,
  IResponseError,
} from "@/shared/utils/apiResponseError";

export function useAddArticle(
  tagList: string[],
  reset: UseFormReset<IFormAddArticleT>,
  modeForm: string,
  slug: string | undefined,
) {
  const [addArticle, { isLoading }] = usePostAddArticleMutation();
  const [editArticle] = useEditArticleMutation();
  const navigate = useNavigate();

  async function onSubmit(data: IFormAddArticleT) {
    try {
      const article = {
        article: {
          ...data,
          tagList,
        },
      };

      if (modeForm === "Editing" && slug) {
        const response = await editArticle({ article, slug }).unwrap();

        console.log(response);
      } else {
        const response = await addArticle(article).unwrap();
        console.log(response);
      }
      reset();
      navigate(AppRoute.Home);
    } catch (error) {
      apiResponseError(error as IResponseError);
    }
  }
  return { onSubmit, isLoading };
}
