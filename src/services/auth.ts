import axios from "axios";
import { LoginFormProps } from "../components/LoginForm/LoginForm";
import { AuthDetails, AuthToken, SignUpForm } from "../type";
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

export const refreshTokenApi = async (user: AuthDetails) => {
  const response = await axios.post("/auth/refresh-token", null, {
    params: {
      refreshToken: user.userDetails?.refreshToken,
      userId: user.userDetails?.id,
    },
  });
  return response.data;
};

export const signOutApi = async () => {
  const response = await axios.delete("/auth/signOut");
  return response.data;
};