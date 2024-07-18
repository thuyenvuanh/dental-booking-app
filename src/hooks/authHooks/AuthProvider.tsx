import { AuthDetails, HookProps, SignUpForm, User } from "../../type.ts";
import { LoginFormProps } from "../../components/LoginForm/LoginForm.tsx";
import { createContext, useCallback, useEffect, useState } from "react";
import { LocalStorage } from "../../utils/storageUtils.ts";
import { isNil, isNull } from "lodash";
import { currentUser, loginApi, signUpApi } from "../../services/auth.ts";
import axios, { AxiosRequestHeaders } from "axios";

export interface AuthContextInterface {
  authDetails: AuthDetails | null;
  login: (user: LoginFormProps) => Promise<User>;
  signUp: (signUpForm: SignUpForm) => any;
  logout: () => void;
  isAuthenticated: () => boolean;
  accessToken: string;
  refreshToken: string;
}

export const AuthContext = createContext<AuthContextInterface | undefined>(
  undefined
);

const AuthProvider: React.FC<HookProps> = ({ children }) => {
  const [authDetails, setAuthDetails] = useState<AuthDetails | null>(
    LocalStorage.get<AuthDetails>("authDetails")
  );
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [injectAuth, setInjectAuth] = useState(-1);
  useEffect(() => {
    const loggedInUser = LocalStorage.get<AuthDetails>("authDetails");
    if (!isNull(loggedInUser)) {
      setAuthDetails(loggedInUser);
    }
  }, []);

  useEffect(() => {
    const injectAuth = axios.interceptors.request.use((config) => ({
      ...config,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      } as AxiosRequestHeaders,
    }));
    setInjectAuth(injectAuth);
    return () => {
      axios.interceptors.request.eject(injectAuth);
      setInjectAuth(-1);
    };
  }, [accessToken]);

  const login = useCallback(
    async (user: LoginFormProps) => {
      const authToken = await loginApi(user);
      setAccessToken(authToken.token);
      setRefreshToken(authToken.refreshToken);
      sessionStorage.setItem("rfn", authToken.refreshToken);
      const { result } = await currentUser(authToken.token);
      setAuthDetails({ userDetails: result });
      LocalStorage.set("authDetails", {
        userDetails: result,
      } as AuthDetails);
      return result;
    },
    [setAuthDetails, loginApi, currentUser]
  );

  const logout = useCallback(() => {
    setAuthDetails(null);
    LocalStorage.clear("authDetails");
    axios.interceptors.request.eject(injectAuth);
    setInjectAuth(-1);
  }, [setAuthDetails]);

  const signUp = useCallback(
    async (signUpForm: SignUpForm) => {
      let success: boolean = await signUpApi(signUpForm);
      if (success) {
        return login({
          username: signUpForm.userName,
          password: signUpForm.password,
          remember: false,
        });
      }
    },
    [signUpApi]
  );

  const isAuthenticated = useCallback(() => !isNil(authDetails), [authDetails]);

  return (
    <AuthContext.Provider
      value={{
        authDetails,
        login,
        isAuthenticated,
        logout,
        signUp,
        accessToken,
        refreshToken,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
