import { UseFormReset } from "react-hook-form";
import { SignUpFormData } from "./types";
import { apiRegistration } from "./apiRegistration";
import {
  apiResponseError,
  IResponseError,
} from "@/shared/utils/apiResponseError";
import { apiAuth } from "../SignIn/apiAuth";
import { useNavigate } from "react-router-dom";
import { AppRoute } from "@/shared/config/route";
import { useDispatch } from "react-redux";
import { login } from "./authSlice";

interface UseSignUpProps {
  reset: UseFormReset<SignUpFormData>;
}

export default function useSignUp({ reset }: UseSignUpProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [regUser, { isError: isErrorReg, isLoading: isLoadingReg }] =
    apiRegistration.usePostRegistrationMutation();

  const [authUser, { isError: isErrorAuth, isLoading: isLoadingAuth }] =
    apiAuth.usePostAuthMutation();

  async function onSubmitReg(dataForm: SignUpFormData) {
    const { agreement, repeatPassword, ...user } = dataForm;
    void agreement;
    void repeatPassword;
    try {
      await regUser(user).unwrap();
      try {
        const result = await authUser({
          email: user.email,
          password: user.password,
        }).unwrap();
        document.cookie = `authToken=${result.user.token}`;
        localStorage.setItem(
          "user",
          JSON.stringify({
            username: result.user.username,
            email: result.user.email,
          }),
        );
        dispatch(login(result.user));
      } catch (error) {
        apiResponseError(error as IResponseError);
      }
      reset();
      navigate(AppRoute.Home);
    } catch (error) {
      apiResponseError(error as IResponseError);
    }
  }

  const isError = isErrorReg || isErrorAuth;
  const isLoading = isLoadingAuth || isLoadingReg;
  return { onSubmitReg, isError, isLoading };
}
