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

interface IUseAddArticleParams {
  tagList: string[];
  reset: UseFormReset<IFormAddArticleT>;
  modeForm: string;
  slug?: string;
}

export function useAddArticle(params: IUseAddArticleParams) {
  const { modeForm, reset, tagList, slug } = params;
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
        await editArticle({ article, slug }).unwrap();
      } else {
        await addArticle(article).unwrap();
      }
      reset();
      navigate(AppRoute.Home);
    } catch (error) {
      apiResponseError(error as IResponseError);
    }
  }
  return { onSubmit, isLoading };
}
