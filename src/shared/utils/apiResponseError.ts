interface IResponseErrors {
  email: string;
  username: string;
  "email or password"?: string;
}

interface IResponseDataError {
  errors: IResponseErrors;
}

export interface IResponseError {
  data: IResponseDataError;
  status: number;
}

export function apiResponseError(error: IResponseError) {
  if (error.status === 500) {
    alert("Ошибка сервера, попробуйте еще раз");
  }
  if (error.data.errors["email or password"] === "is invalid") {
    alert("Неверный логин или пароль");
  } else {
    alert(error.data.errors.email);
  }
}
