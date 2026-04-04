import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import { AppRoute } from "@/shared/config/route";
import { isAuthorized } from "@/shared/utils/isAuthorized";
import useLogAut from "@/shared/hooks/useLogAut";

export default function Header() {
  const user = JSON.parse(localStorage.getItem("user") ?? "null");
  const { handleLogout } = useLogAut();
  return (
    <header className={styles.header}>
      <Link className={styles.title} to={AppRoute.Home}>
        Realworld Blog
      </Link>
      {!isAuthorized() && (
        <div>
          <Link className={styles.linkSignIn} to={AppRoute.SignIn}>
            Sign in
          </Link>

          <Link className={styles.linkSignUp} to={AppRoute.SignUp}>
            Sign up
          </Link>
        </div>
      )}
      {isAuthorized() && (
        <div>
          <Link
            to={AppRoute.AddArticle}
            state={{ path: "Create" }}
            className={styles.createArticle}
          >
            Create article
          </Link>
          <Link to={AppRoute.EditProfile} className={styles.linkProfile}>
            {user.username}
            <img src={user.logo} alt="Logo" />
          </Link>
          <button onClick={handleLogout} className={styles.buttonLogOut}>
            Log Out
          </button>
        </div>
      )}
    </header>
  );
}
