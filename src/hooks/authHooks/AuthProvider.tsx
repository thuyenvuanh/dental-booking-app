import { AuthDetails, HookProps, SignUpForm } from "../../type.ts";
import { LoginFormProps } from "../../components/LoginForm/LoginForm.tsx";
import { createContext, useCallback, useEffect, useState } from "react";
import { isEmpty, isNil } from "lodash";
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
import { SessionStorage } from "../../utils/sessionStorage.ts";
import { eraseCookie, getCookie, setCookie } from "../../utils/cookies.ts";

export interface AuthContextInterface {
  authDetails: AuthDetails | null;
  login: (user: LoginFormProps) => Promise<string>;
  signUp: (signUpForm: SignUpForm) => Promise<void>;
  logout: () => Promise<void>;
  getCurrentUser: () => Promise<AuthDetails>;
  isAuthenticated: () => boolean;
  isAuthLoading: boolean;
  accessToken: string;
}

export const AuthContext = createContext<AuthContextInterface | undefined>(
  undefined
);

const AuthProvider: React.FC<HookProps> = ({ children }) => {
  const [authDetails, setAuthDetails] = useState<AuthDetails | null>(
    SessionStorage.get<AuthDetails>(AUTH_DETAILS)
  );
  const REFRESH_TOKEN = "RFSHTKN";
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [accessToken, setAccessToken] = useState("");
  const [injectAuth, setInjectAuth] = useState(-1);
  const { message } = useNotification();

  useEffect(() => {
    if (!isEmpty(accessToken) && !isNil(authDetails) && injectAuth != -1) {
      setIsAuthLoading(false);
    }
  }, [accessToken, authDetails, injectAuth]);

  useEffect(() => {
    const loggedInUser = SessionStorage.get<AuthDetails>(AUTH_DETAILS);
    const refreshToken = getCookie(REFRESH_TOKEN);
    if (
      !isNil(loggedInUser) &&
      !isEmpty(loggedInUser) &&
      !isNil(refreshToken)
    ) {
      setAuthDetails(loggedInUser);
      setTimeout(() => {
        refreshTokenApi({
          refreshToken,
          userId: loggedInUser.userDetails?.id!,
        })
          .then((authToken) => {
            setAccessToken(authToken.token);
            updateRefreshToken(authToken.refreshToken);
          })
          .catch((error) => {
            logout();
            console.error(error);
            message.warning({
              content: "Đã hết thời gian chờ phiên. Vui lòng đăng nhập lại",
            });
          });
      }, 500);
      return;
    }
    setIsAuthLoading(false);
  }, []);

  useEffect(() => {
    // cannot get accessToken after init
    // remove authDetails in session
    const userDetailsInSession = SessionStorage.get<AuthDetails>(AUTH_DETAILS);
    if (
      isEmpty(accessToken) &&
      !isAuthLoading &&
      !isNil(userDetailsInSession)
    ) {
      SessionStorage.clearAll();
      setAuthDetails(null);
    }
  }, [accessToken, isAuthLoading]);

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

  const getCurrentUser = useCallback(async () => {
    const result = await currentUserApi();
    const authDetails = {
      userDetails: result,
    } as AuthDetails;
    setAuthDetails(authDetails);
    SessionStorage.set(AUTH_DETAILS, authDetails);
    return authDetails;
  }, [accessToken, currentUserApi]);

  const login = useCallback(
    async (user: LoginFormProps) => {
      const { token, refreshToken } = await loginApi(user);
      setAccessToken(token);
      updateRefreshToken(refreshToken);
      return token;
    },
    [loginApi]
  );

  const logout = useCallback(async () => {
    await signOutApi();
    setAccessToken("");
    setAuthDetails(null);
    SessionStorage.clear(AUTH_DETAILS);
    eraseCookie(REFRESH_TOKEN);
    axios.interceptors.request.eject(injectAuth);
    setInjectAuth(-1);
  }, [setAuthDetails, setAccessToken, setInjectAuth, injectAuth, signOutApi]);

  const signUp = useCallback(
    async (signUpForm: SignUpForm) => {
      const success: boolean = await signUpApi(signUpForm);
      if (success) {
        await login({
          username: signUpForm.userName,
          password: signUpForm.password,
          remember: false,
        });
      }
    },
    [signUpApi]
  );

  const isAuthenticated = useCallback(
    () => !isNil(accessToken) && !isEmpty(accessToken),
    [accessToken]
  );

  const updateRefreshToken = (refreshToken: string) => {
    setCookie(REFRESH_TOKEN, refreshToken, 7);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthLoading,
        authDetails,
        getCurrentUser,
        login,
        isAuthenticated,
        logout,
        signUp,
        accessToken,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
