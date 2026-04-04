import { IUser } from "@/shared/types/user";

export interface SignUpFormData extends Omit<IUser, "token"> {
  password: string;
  repeatPassword: string;
  agreement: boolean;
}

export type FormData = Omit<SignUpFormData, "repeatPassword" | "agreement">;

export interface RegistrationResponse {
  user: IUser;
}
