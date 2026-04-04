import { logout } from "@/features/SignUp/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppRoute } from "../config/route";

export default function useLogAut() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.removeItem("user");
    document.cookie = `authToken=${new Date(0)}`;
    dispatch(logout());
    navigate(AppRoute.SignIn);
  }
  return { handleLogout };
}
