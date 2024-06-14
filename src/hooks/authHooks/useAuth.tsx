import {useContext,} from "react";
import {AuthContext, AuthContextInterface} from "./AuthProvider.tsx";

export const useAuth = (): AuthContextInterface => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuthContext must be used within a AuthProvider.tsx");
    }
    return context;
};