import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import { AppRoute } from "@/shared/config/route";
import useLogAut from "@/shared/hooks/useLogAut";
import { isAuthorized } from "@/shared/utils/isAuthorized";
import { useDispatch } from "react-redux";
import { clearForm } from "@/features/AddArticle/articleFormSlice";

export default function Header() {
  const user = isAuthorized();
  console.log(user);
  const { handleLogout } = useLogAut();
  const dispatch = useDispatch();

  return (
    <header className={styles.header}>
      <Link className={styles.title} to={AppRoute.Home}>
        Realworld Blog
      </Link>
      {!user && (
        <div>
          <Link className={styles.linkSignIn} to={AppRoute.SignIn}>
            Sign in
          </Link>

          <Link className={styles.linkSignUp} to={AppRoute.SignUp}>
            Sign up
          </Link>
        </div>
      )}
      {user && (
        <div>
          <Link
            to={AppRoute.AddArticle}
            state={{ path: "Create" }}
            className={styles.createArticle}
            onClick={() => dispatch(clearForm())}
          >
            Create article
          </Link>
          <Link to={AppRoute.EditProfile} className={styles.linkProfile}>
            {user.username}
            <img src={user.image} alt="Logo" />
          </Link>
          <button onClick={handleLogout} className={styles.buttonLogOut}>
            Log Out
          </button>
        </div>
      )}
    </header>
  );
}
