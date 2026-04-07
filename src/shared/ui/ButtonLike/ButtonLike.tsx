import { Heart } from "lucide-react";
import styles from "./ButtonLike.module.scss";
import useLikeButton from "@/shared/hooks/useLikeButton";
import { isAuthorized } from "@/shared/utils/isAuthorized";
import { useSelector } from "react-redux";
import { RootState } from "@/shared/config/store";

interface ButtonLikeProps {
  quantityLike: number;
  slug: string;
}

export default function ButtonLike({ quantityLike, slug }: ButtonLikeProps) {
  const { toggleLike } = useLikeButton();
  const favorited = useSelector((state: RootState) => state.likes.favorited);
  const isFavorited = favorited?.includes(slug);

  return (
    <div className={styles.wrapperLike}>
      <button
        onClick={() => toggleLike(slug)}
        className={styles.buttonLike}
        disabled={!!isAuthorized()}
      >
        <Heart
          className={styles.heart}
          fill={isFavorited ? "red" : "white"}
          stroke={isFavorited ? "red" : "gray"}
        />
      </button>
      <span className="">{quantityLike}</span>
    </div>
  );
}
