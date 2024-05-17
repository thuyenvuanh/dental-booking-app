import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "../utils/type";
import { LoginFormProps } from "../components/LoginForm/LoginForm";
import { loginApi } from "../services/auth";
import { isNil, isNull } from "lodash";
import { LocalStorage } from "../utils/storageUtils";

interface AuthDetails {
  userDetails?: User;
}

interface AuthContextInterface {
  authDetails: AuthDetails | null;
  login: (user: LoginFormProps) => User;
  isAuthenticated: () => boolean;
}

const AuthContext = createContext<AuthContextInterface | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authDetails, setAuthDetails] = useState<AuthDetails | null>(null);

  useEffect(() => {
    const loggedInUser = LocalStorage.get<AuthDetails>("authDetails");
    if (!isNull(loggedInUser)) {
      setAuthDetails(loggedInUser);
    }
  }, []);

  const login = useCallback(
    (user: LoginFormProps) => {
      const loggedInUser = loginApi(user);
      setAuthDetails({ userDetails: loggedInUser });
      LocalStorage.set("authDetails", loggedInUser);
      return loggedInUser;
    },
    [setAuthDetails, loginApi]
  );

  const isAuthenticated = useCallback(() => !isNil(authDetails), [authDetails]);

  return (
    <AuthContext.Provider value={{ authDetails, login, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextInterface => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }
  return context;
};

export default AuthProvider;
