import ReactDOM from "react-dom";
import styles from "./ModalDeletedArticle.module.scss";
import Warning from "../../../../public/Vector.png";
import useDeleteArticle from "@/features/AddArticle/useDeleteArticle";
import { useCallback, useEffect, useState } from "react";

interface ModalDeletedArticleProps {
  isOpen: boolean;
  slug: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  buttonDeleteRef: React.RefObject<HTMLButtonElement>;
}

export default function ModalDeletedArticle({
  isOpen,
  slug,
  setIsOpen,
  buttonDeleteRef,
}: ModalDeletedArticleProps) {
  const [coords, setCoords] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });
  const { handleDelete } = useDeleteArticle();

  const updatePosition = useCallback(() => {
    console.log("updatePosition");
    if (buttonDeleteRef.current) {
      const rect = buttonDeleteRef.current.getBoundingClientRect();
      setCoords({
        top: rect.top + window.scrollY,
        left: rect.right + window.scrollX,
      });
    }
  }, [buttonDeleteRef]);

  useEffect(() => {
    console.log("useEffect");
    if (isOpen) {
      updatePosition();

      window.addEventListener("resize", updatePosition);
      window.addEventListener("scroll", updatePosition);

      return () => {
        window.removeEventListener("resize", updatePosition);
        window.removeEventListener("scroll", updatePosition);
      };
    }
  }, [isOpen, updatePosition]);

  if (isOpen) {
    return ReactDOM.createPortal(
      <div
        className={styles.modalWrapper}
        style={{ top: `${coords.top}px`, left: `${coords.left + 10}px` }}
      >
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
      </div>,
      document.getElementById("modal-root")!,
    );
  } else {
    return null;
  }
}
