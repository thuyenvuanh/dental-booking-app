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
import { AUTH_DETAILS, ROLE, ROLE_KEY } from "../../constants/default.ts";
import { parseJwt } from "../../utils/jwt.ts";
import { SessionStorage } from "../../utils/sessionStorage.ts";

export interface AuthContextInterface {
  authDetails: AuthDetails | null;
  login: (user: LoginFormProps) => Promise<string>;
  signUp: (signUpForm: SignUpForm) => Promise<void>;
  logout: () => Promise<void>;
  getCurrentUser: () => Promise<AuthDetails>;
  isAuthenticated: () => boolean;
  isAuthLoading: boolean;
  role: ROLE;
  accessToken: string;
}

export const AuthContext = createContext<AuthContextInterface | undefined>(
  undefined
);

const AuthProvider: React.FC<HookProps> = ({ children }) => {
  const [authDetails, setAuthDetails] = useState<AuthDetails | null>(
    SessionStorage.get<AuthDetails>(AUTH_DETAILS)
  );
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [role, setRole] = useState<ROLE>("GUEST");
  const [accessToken, setAccessToken] = useState("");
  const [injectAuth, setInjectAuth] = useState(-1);
  const { message } = useNotification();
  useEffect(() => {
    const loggedInUser = SessionStorage.get<AuthDetails>(AUTH_DETAILS);
    if (
      !isNil(loggedInUser) &&
      !isEmpty(loggedInUser) &&
      loggedInUser?.userDetails?.refreshToken
    ) {
      setAuthDetails(loggedInUser);
      setTimeout(() => {
        refreshTokenApi(loggedInUser)
          .then((authToken) => {
            setAccessToken(authToken.token);
            getRole(authToken.token);
            updateRefreshToken(authToken.refreshToken);
          })
          .catch((error) => {
            logout();
            console.error(error);
            message.warning({
              content: "Đã hết thời gian chờ phiên. Vui lòng đăng nhập lại",
            });
          })
          .finally(() => setIsAuthLoading(false));
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

  const getRole = useCallback(
    (accessToken: string) => {
      const role = (
        parseJwt(accessToken)[ROLE_KEY] as string
      ).toUpperCase() as ROLE;
      setRole(role);
    },
    [accessToken]
  );

  useEffect(() => {
    if (!isEmpty(accessToken)) {
      //config roles
      //FIXME - role should be get from currentUser api
      getRole(accessToken);
      //FIXME - end

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
    const { result } = await currentUserApi();
    const authDetails = {
      userDetails: result,
    } as AuthDetails;
    setAuthDetails(authDetails);
    SessionStorage.set(AUTH_DETAILS, authDetails);
    return authDetails;
  }, [accessToken, currentUserApi]);

  const login = useCallback(
    async (user: LoginFormProps) => {
      const { token } = await loginApi(user);
      setAccessToken(token);
      return token;
    },
    [loginApi]
  );

  const logout = useCallback(async () => {
    await signOutApi();
    setRole("GUEST");
    setAccessToken("");
    setAuthDetails(null);
    SessionStorage.clear(AUTH_DETAILS);
    axios.interceptors.request.eject(injectAuth);
    setInjectAuth(-1);
  }, [setAuthDetails]);

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
    const authDetails = SessionStorage.get<AuthDetails>(AUTH_DETAILS);
    if (authDetails?.userDetails?.refreshToken) {
      authDetails.userDetails.refreshToken = refreshToken;
      SessionStorage.set(AUTH_DETAILS, authDetails);
      return;
    }
    console.error("Failed to update refreshToken");
  };

  return (
    <AuthContext.Provider
      value={{
        role,
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
