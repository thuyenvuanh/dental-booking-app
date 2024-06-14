import {AuthDetails, AuthToken, HookProps, User} from "../../type.ts";
import {LoginFormProps} from "../../components/LoginForm/LoginForm.tsx";
import {createContext, useCallback, useEffect, useState} from "react";
import {LocalStorage} from "../../utils/storageUtils.ts";
import {isNil, isNull, omit} from "lodash";
import {loginApi} from "../../services/auth.ts";
import axios, {AxiosRequestHeaders} from "axios";
import {mockUser} from "../../mocks/user.ts";

export interface AuthContextInterface {
    authDetails: AuthDetails | null;
    login: (user: LoginFormProps) => Promise<User>;
    logout: () => void;
    isAuthenticated: () => boolean;
    accessToken: string;
    refreshToken: string;
}

export const AuthContext = createContext<AuthContextInterface | undefined>(undefined);

const AuthProvider: React.FC<HookProps> = ({children}) => {
    const [authDetails, setAuthDetails] = useState<AuthDetails | null>(LocalStorage.get<AuthDetails>('authDetails'));
    const [accessToken, setAccessToken] = useState('');
    const [refreshToken, setRefreshToken] = useState('');
    const [injectAuth, setInjectAuth] = useState(-1);
    useEffect(() => {
        const loggedInUser = LocalStorage.get<AuthDetails>("authDetails");
        if (!isNull(loggedInUser)) {
            setAuthDetails(loggedInUser);
        }
    }, []);

    useEffect(() => {
        const injectAuth = axios.interceptors.request.use(config => ({
            ...config,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            } as AxiosRequestHeaders
        }));
        setInjectAuth(injectAuth);
        return () => {
            axios.interceptors.request.eject(injectAuth);
            setInjectAuth(-1);
        };
    }, [accessToken]);

    const login = useCallback(
        async (user: LoginFormProps) => {
            const response = await axios.post('/auth/sigIn', omit(user, 'remember'));
            const authToken = response.data as AuthToken;
            setAccessToken(authToken.token);
            setRefreshToken(authToken.refreshToken);
            sessionStorage.setItem('rfn', authToken.refreshToken);
            const loggedInUser = mockUser;
            setAuthDetails({userDetails: loggedInUser});
            LocalStorage.set("authDetails", {
                userDetails: loggedInUser,
            } as AuthDetails);
            return loggedInUser;
        },
        [setAuthDetails, loginApi]
    );

    const logout = useCallback(() => {
        setAuthDetails(null);
        LocalStorage.clear("authDetails");
        axios.interceptors.request.eject(injectAuth);
        setInjectAuth(-1);
    }, [setAuthDetails]);

    const isAuthenticated = useCallback(() => !isNil(authDetails), [authDetails]);

    return (
        <AuthContext.Provider value={{authDetails, login, isAuthenticated, logout, accessToken, refreshToken}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
