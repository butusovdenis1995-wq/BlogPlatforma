import { getCookie } from "./authToken";

export function isAuthorized() {
  const dataUser = localStorage.getItem("user");
  const authCookes = getCookie().authToken;
  return authCookes && dataUser ? JSON.parse(dataUser) : false;
}
