import WrapperCard from "@/shared/ui/WrapperCard";
import Form from "@/shared/ui/WrapperForm";
import { useForm } from "react-hook-form";
import styles from "./EditProfile.module.scss";
import useEditProfile from "./useEditProfile";
import { Spin } from "antd";

export default function EditProfile() {
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    values: {
      username: user.username,
      email: user.email,
      newpassword: "",
      avatar: "",
    },
  });

  const { onSubmit, isLoading } = useEditProfile();
  return (
    <WrapperCard className={styles.editFormWrapper}>
      {isLoading ? (
        <Spin className={styles.spin} size="large" />
      ) : (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <p>Edit Profile</p>
          <label htmlFor="username">
            Username
            <input
              className={styles.input}
              type="text"
              id="username"
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
              {errors.username.message?.toString()}
            </span>
          )}
          <label htmlFor="email">
            Email address
            <input
              className={styles.input}
              type="text"
              id="email"
              {...register("email", {
                required: "Введите почту",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Почта не валидна",
                },
              })}
            />
          </label>

          {errors.email && <span>{errors.email.message?.toString()}</span>}
          <label htmlFor="password">
            New password
            <input
              className={styles.input}
              id="password"
              type="password"
              placeholder="New password"
              {...register("newpassword")}
            />
          </label>
          <label htmlFor="avatar">
            Avatar image (url)
            <input
              className={styles.input}
              type="url"
              id="avatar"
              placeholder="Avatar image"
              {...register("avatar")}
            />
          </label>
          <button type="submit">Save</button>
        </Form>
      )}
    </WrapperCard>
  );
}
