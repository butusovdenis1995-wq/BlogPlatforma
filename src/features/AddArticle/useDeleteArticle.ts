import { useNavigate } from "react-router-dom";
import { useDeleteArticleMutation } from "./apiDelete";
import { AppRoute } from "@/shared/config/route";
import {
  apiResponseError,
  IResponseError,
} from "@/shared/utils/apiResponseError";

export default function useDeleteArticle() {
  const navigate = useNavigate();
  const [deleteArticle] = useDeleteArticleMutation();
  async function handleDelete(slug: string) {
    try {
      await deleteArticle(slug);
      navigate(AppRoute.Home);
    } catch (error) {
      apiResponseError(error as IResponseError);
    }
  }
  return { handleDelete };
}
