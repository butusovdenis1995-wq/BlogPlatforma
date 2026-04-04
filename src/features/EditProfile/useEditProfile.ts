import {
  apiResponseError,
  IResponseError,
} from "@/shared/utils/apiResponseError";
import { useEditProfileMutation } from "./apiEditProfile";
import { useNavigate } from "react-router-dom";
import { AppRoute } from "@/shared/config/route";

interface UserProfile {
  username: string;
  email: string;
  avatar: string;
  password?: string;
}

interface UserResponse {
  user: {
    email: string;
    username: string;
    token: string;
  };
}

export default function useEditProfile() {
  const [editProfile, { isLoading }] = useEditProfileMutation();
  const navigate = useNavigate();
  async function onSubmit(user: UserProfile) {
    try {
      console.log(user);
      const result: UserResponse = await editProfile({ user }).unwrap();
      console.log(result);
      document.cookie = `authToken=${result.user.token}`;
      localStorage.setItem(
        "user",
        JSON.stringify({
          username: result.user.username,
          email: result.user.email,
          image: user.avatar,
        }),
      );
      navigate(AppRoute.Home);
    } catch (error) {
      apiResponseError(error as IResponseError);
    }
  }
  return { onSubmit, isLoading };
}
// пароль denisbt - 1234567

//https://upload.wikimedia.org/wikipedia/commons/9/9c/Darth_Vader_-_2007_Disney_Weekends.jpg
//dbutusov.95@gmail.com
