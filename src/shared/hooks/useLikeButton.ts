import { useState } from "react";
import { useDeleteLikeMutation, usePostLikeMutation } from "../api/apiLike";

export default function useLikeButton() {
  const [putLike] = usePostLikeMutation();
  const [offLike] = useDeleteLikeMutation();
  const [Favorited, setFavorited] = useState<string[]>(() => {
    const stored = localStorage.getItem("articleFavorited");
    if (!stored) return [];

    const parsed = JSON.parse(stored);
    if (Array.isArray(parsed)) return parsed;
    if (typeof parsed === "string") return [parsed];
    return [];
  });

  async function toggleLike(slug: string) {
    if (!Favorited.length) {
      await putLike(slug);
      const newFavorited = [slug];
      localStorage.setItem("articleFavorited", JSON.stringify(newFavorited));
      setFavorited(newFavorited);
    } else if (Favorited.includes(slug)) {
      await offLike(slug);
      const newFavorited = Favorited.filter((art) => art !== slug);
      localStorage.setItem("articleFavorited", JSON.stringify(newFavorited));
      setFavorited(newFavorited);
    } else {
      await putLike(slug);
      const newFavorited = [...Favorited, slug];
      localStorage.setItem("articleFavorited", JSON.stringify(newFavorited));
      setFavorited(newFavorited);
    }
  }
  return { toggleLike, Favorited };
}
