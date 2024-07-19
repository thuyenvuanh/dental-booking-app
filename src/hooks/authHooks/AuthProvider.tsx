import { AuthDetails, HookProps, SignUpForm } from "../../type.ts";
import { LoginFormProps } from "../../components/LoginForm/LoginForm.tsx";
import { createContext, useCallback, useEffect, useState } from "react";
import { LocalStorage } from "../../utils/storageUtils.ts";
import { isEmpty, isNil, isNull } from "lodash";
import {
  currentUserApi,
  loginApi,
  refreshTokenApi,
  signOutApi,
  signUpApi,
} from "../../services/auth.ts";
import axios, { AxiosRequestHeaders } from "axios";
import { useNotification } from "../notificationHooks/useNotification.tsx";
import { AUTH_DETAILS } from "../../constants/default.ts";

export interface AuthContextInterface {
  authDetails: AuthDetails | null;
  login: (user: LoginFormProps) => Promise<void>;
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
    LocalStorage.get<AuthDetails>(AUTH_DETAILS)
  );
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [injectAuth, setInjectAuth] = useState(-1);
  const { notify } = useNotification();
  useEffect(() => {
    const loggedInUser = LocalStorage.get<AuthDetails>(AUTH_DETAILS);
    if (!isNull(loggedInUser)) {
      setAuthDetails(loggedInUser);
      setTimeout(() => {
        if (loggedInUser?.userDetails?.refreshToken) {
          refreshTokenApi(loggedInUser).then((authToken) => {
            setAccessToken(authToken.token);
            setRefreshToken(authToken.refreshToken);
            notify.success({
              message: "Session recovered successfully",
            });
          });
        } else {
          signOutApi().then(() => {
            setAccessToken("");
            setRefreshToken("");
            setAuthDetails(null);
            LocalStorage.clear(AUTH_DETAILS);
            notify.warning({ message: "You have been signed out" });
          });
        }
      }, 500);
    }
  }, []);

  useEffect(() => {
    if (!isEmpty(accessToken)) {
      const injectAuth = axios.interceptors.request.use((config) => ({
        ...config,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        } as AxiosRequestHeaders,
      }));
      setInjectAuth(injectAuth);
    } else {
      axios.interceptors.request.eject(injectAuth);
      setInjectAuth(-1);
    }
    return () => {
      axios.interceptors.request.eject(injectAuth);
      setInjectAuth(-1);
    };
  }, [accessToken]);

  useEffect(() => {
    if (!isEmpty(accessToken) && injectAuth != -1) {
      currentUserApi().then(({ result }) => {
        setAuthDetails({ userDetails: result });
        LocalStorage.set(AUTH_DETAILS, {
          userDetails: result,
        } as AuthDetails);
      });
    }
  }, [accessToken, injectAuth]);

  const login = useCallback(
    async (user: LoginFormProps) => {
      const { token, refreshToken } = await loginApi(user);
      setAccessToken(token);
      setRefreshToken(refreshToken);
    },
    [setAuthDetails, loginApi, currentUserApi]
  );

  const logout = useCallback(() => {
    setAuthDetails(null);
    LocalStorage.clear(AUTH_DETAILS);
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
