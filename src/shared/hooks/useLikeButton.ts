import { useDispatch, useSelector } from "react-redux";
import { useDeleteLikeMutation, usePostLikeMutation } from "../api/apiLike";
import { RootState } from "../config/store";
import { addLike, removeLike } from "../slice/likeSlice";

export default function useLikeButton() {
  const [putLike] = usePostLikeMutation();
  const [offLike] = useDeleteLikeMutation();

  const dispatch = useDispatch();
  const favorited = useSelector((state: RootState) => state.likes.favorited);

  async function toggleLike(slug: string) {
    if (favorited.includes(slug)) {
      dispatch(removeLike(slug));
      await offLike(slug);
    } else {
      dispatch(addLike(slug));
      await putLike(slug);
    }
  }
  return { toggleLike };
}
