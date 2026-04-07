import { getCookie } from "./authToken";

export function isAuthorized() {
  const dataUser = localStorage.getItem("user");
  const authCookes = getCookie().authToken;
  console.log(authCookes);
  return authCookes && dataUser ? JSON.parse(dataUser) : false;
}
