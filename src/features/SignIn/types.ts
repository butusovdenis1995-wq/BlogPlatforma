import { IUser } from "@/shared/types/user";

export interface IUserAuth {
  email: IUser["email"];
  password: string;
}

export interface IAuthResponse {
  user: IUser;
}
