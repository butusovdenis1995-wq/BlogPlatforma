import WrapperCard from "@/shared/ui/WrapperCard";
import styles from "./SignIn.module.scss";
import { Link } from "react-router-dom";
import { AppRoute } from "@/shared/config/route";
import Form from "@/shared/ui/WrapperForm";
import { useForm } from "react-hook-form";
import { IUserAuth } from "./types";
import { apiAuth } from "./apiAuth";
import { useNavigate } from "react-router-dom";
import {
  apiResponseError,
  IResponseError,
} from "@/shared/utils/apiResponseError";

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserAuth>({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const navigate = useNavigate();

  const [authUser] = apiAuth.usePostAuthMutation();
  async function handleFormSubmit(data: IUserAuth) {
    try {
      const result = await authUser(data).unwrap();
      if (typeof window !== "undefined") {
        document.cookie = `authToken=${result.user.token}`;
        localStorage.setItem(
          "user",
          JSON.stringify({
            username: result.user.username,
            email: result.user.email,
          }),
        );
      }
      navigate(AppRoute.Home);
    } catch (error) {
      apiResponseError(error as IResponseError);
    }
  }
  return (
    <WrapperCard className={styles.signInWrapper}>
      <Form onSubmit={handleSubmit(handleFormSubmit)}>
        <p>Sign In</p>
        <label htmlFor="Email">
          Email address
          <input
            className={errors.email && styles.inputWarning}
            id="Email"
            placeholder="Email address"
            {...register("email", {
              required: "Введите почту",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Почта не валидна",
              },
            })}
          />
        </label>
        {errors.email && <span>{errors.email.message}</span>}
        <label htmlFor="Password">
          Password
          <input
            id="Password"
            type="text"
            placeholder="Password"
            {...register("password", {
              required: "Введите пароль",
            })}
          />
        </label>

        <button type="submit">Login</button>
        <p>
          Don’t have an account?{" "}
          <Link className={styles.link} to={AppRoute.SignUp}>
            Sign Up.
          </Link>
        </p>
      </Form>
    </WrapperCard>
  );
}
