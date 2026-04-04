import WrapperCard from "@/shared/ui/WrapperCard";
import styles from "./SignUp.module.scss";
import Form from "@/shared/ui/WrapperForm";
import { Link } from "react-router-dom";
import { AppRoute } from "@/shared/config/route";
import { useForm } from "react-hook-form";
import { SignUpFormData } from "./types";
import useSignUp from "./useSignUp";
import { Spin } from "antd";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<SignUpFormData>({
    mode: "onBlur",
    defaultValues: {
      username: "",
      email: "",
      password: "",
      repeatPassword: "",
      agreement: false,
    },
  });

  const password = watch("password");

  const { onSubmitReg, isLoading } = useSignUp({ reset });

  return (
    <WrapperCard className={styles.signUpWrapper}>
      {isLoading ? (
        <Spin size="large" />
      ) : (
        <Form onSubmit={handleSubmit(onSubmitReg)}>
          <p>Create new account</p>
          <label htmlFor="userName">
            Username
            <input
              className={errors.username && styles.inputWarning}
              id="userName"
              placeholder="Username"
              {...register("username", {
                required: "Введите имя",
                minLength: {
                  value: 2,
                  message: "Слишком короткие имя",
                },
              })}
            />
          </label>
          {errors.username && (
            <span className={styles.warningText}>
              {errors.username.message}
            </span>
          )}
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
              className={errors.password && styles.inputWarning}
              type="password"
              id="Password"
              placeholder="Password"
              {...register("password", {
                required: "Введите пароль",
                minLength: {
                  value: 7,
                  message: "Слишком короткий пароль",
                },
              })}
            />
          </label>
          {errors.password && <span>{errors.password.message}</span>}
          <label htmlFor="RepeatPassword">
            Repeat Password
            <input
              className={errors.repeatPassword && styles.inputWarning}
              type="password"
              id="RepeatPassword"
              placeholder="Repeat Password"
              {...register("repeatPassword", {
                required: "Повторите пароль",
                validate: (value) =>
                  value === password || "Пароли не совпадают",
              })}
            />
          </label>
          {errors.repeatPassword && (
            <span>{errors.repeatPassword.message}</span>
          )}
          <div className={styles.checkbox}>
            <input
              className={styles.inputCheckbox}
              type="checkbox"
              {...register("agreement", {
                required: "Вы должны согласитсья с условиями",
              })}
            />
            <label className={styles.labelCheckbox}>
              I agree to the processing of my personal information
            </label>
            {errors.agreement && <span>{errors.agreement.message}</span>}
          </div>
          <button type="submit">Create</button>
          <p>
            Already have an account?{" "}
            <Link className={styles.link} to={AppRoute.SignIn}>
              Sign In.
            </Link>
          </p>
        </Form>
      )}
    </WrapperCard>
  );
}
