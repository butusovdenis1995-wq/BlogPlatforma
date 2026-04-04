export enum AppRoute {
  Home = "/",
  Article = "/article/:id",
  SignIn = "/signIn",
  SignUp = "/signUp",
  AddArticle = "/addArticle",
  EditProfile = "/editProfile",
}

export const getRouteArticle = (id: string | number) => `/article/${id}`;
