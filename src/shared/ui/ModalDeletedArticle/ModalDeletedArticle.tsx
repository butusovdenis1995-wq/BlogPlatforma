import ReactDOM from "react-dom";
import styles from "./ModalDeletedArticle.module.scss";
import WrapperCard from "../WrapperCard";
import Warning from "../../../../public/Vector.png";
import useDeleteArticle from "@/features/AddArticle/useDeleteArticle";

interface ModalDeletedArticleProps {
  isOpen: boolean;
  slug: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ModalDeletedArticle({
  isOpen,
  slug,
  setIsOpen,
}: ModalDeletedArticleProps) {
  const { handleDelete } = useDeleteArticle();
  if (isOpen) {
    return ReactDOM.createPortal(
      <WrapperCard className={styles.modalWrapper}>
        <img className={styles.Warning} src={Warning} alt="Warning" />
        <span
          className={styles.modalContent}
          onClick={(e) => e.stopPropagation()}
        >
          Are you sure to delete this article?
        </span>
        <div className={styles.divButton}>
          <button onClick={() => setIsOpen(false)} className={styles.noButton}>
            No
          </button>
          <button
            onClick={() => handleDelete(slug)}
            className={styles.yesButton}
          >
            Yes
          </button>
        </div>
      </WrapperCard>,
      document.getElementById("modal-root")!,
    );
  } else {
    return null;
  }
}
