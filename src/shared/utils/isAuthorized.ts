export function isAuthorized() {
  return !!document.cookie && !!localStorage.getItem("user");
}
