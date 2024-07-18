import axios from "axios";
import { LoginFormProps } from "../components/LoginForm/LoginForm";
import { AuthToken, SignUpForm } from "../type";
import { omit } from "lodash";

export const loginApi = async (user: LoginFormProps): Promise<AuthToken> => {
  try {
    const response = await axios.post("/auth/sigIn", omit(user, "remember"));
    return response.data as AuthToken;
  } catch {
    console.log(`Cannot sign sign with user ${user.username}`);
    return { token: "", refreshToken: "" };
  }
};

export const signUpApi = async (signUpForm: SignUpForm) => {
  try {
    const response = await axios.post("/auth/signUp", signUpForm);
    return response.data;
  } catch {
    console.log(`Cannot sign up for user ${signUpForm}`);
    return false;
  }
};

export const currentUser = async (authToken: string) => {
  try {
    const response = await axios.get("/auth/currentUser", {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    });
    return response.data.user;
  } catch {
    console.log(`Fail to get current user`);
    return false;
  }
}
