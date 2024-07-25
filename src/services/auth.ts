import axios from "axios";
import { LoginFormProps } from "../components/LoginForm/LoginForm";
import { AuthToken, SignUpForm } from "../type";
import { omit } from "lodash";

export const loginApi = async (user: LoginFormProps): Promise<AuthToken> => {
  const response = await axios.post("/auth/sigIn", omit(user, "remember"));
  return response.data as AuthToken;
};

export const signUpApi = async (signUpForm: SignUpForm) => {
  const response = await axios.post("/auth/signUp", signUpForm);
  return response.data;
};

export const currentUserApi = async () => {
  const response = await axios.get("/auth/currentUser");
  return response.data.user;
};

export const refreshTokenApi = async (data: {
  refreshToken: string;
  userId: string;
}) => {
  const response = await axios.post("/auth/refresh-token", null, {
    params: data,
  });
  return response.data as { token: string; refreshToken: string };
};

export const signOutApi = async () => {
  const response = await axios.delete("/auth/signOut");
  return response.data;
};

export const getProfileApi = async () => {
  const response = await axios.get("/profile");
  return response.data as {
    $id: string;
    $values: any[];
  };
};