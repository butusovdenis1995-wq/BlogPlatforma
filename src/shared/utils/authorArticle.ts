export function isAuthorArticle(authUser: string) {
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;

  return user.username === authUser;
}
