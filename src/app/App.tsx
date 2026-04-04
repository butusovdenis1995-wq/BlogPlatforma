import ArticlePage from "@/pages/ArticlePage/ArticlePage";
import ArticlesListPage from "@/pages/ArticlesListPage/ArticlesListPage";
import { AppRoute } from "@/shared/config/route";
import Header from "@/widgets/Header/Header";
import "@app/styles/index.scss";
import { Routes, Route } from "react-router-dom";
import SignInPage from "@/pages/SignInPage/SignInPage";
import SignUpPage from "@/pages/SignUpPage/SignUpPage";
import AddArticlePage from "@/pages/AddArticlePage/AddArticlePage";
import EditProfile from "@/features/EditProfile/EditProfile";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path={AppRoute.Home} element={<ArticlesListPage />} />
          <Route path={AppRoute.Article} element={<ArticlePage />} />
          <Route path={AppRoute.SignIn} element={<SignInPage />} />
          <Route path={AppRoute.SignUp} element={<SignUpPage />} />
          <Route path={AppRoute.AddArticle} element={<AddArticlePage />} />
          <Route path={AppRoute.EditProfile} element={<EditProfile />} />
        </Routes>
      </main>
    </>
  );
}
