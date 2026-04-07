import { logout } from "@/features/SignUp/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppRoute } from "../config/route";

export default function useLogAut() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.removeItem("user");
    document.cookie =
      "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    dispatch(logout());
    navigate(AppRoute.SignIn);
  }
  return { handleLogout };
}
