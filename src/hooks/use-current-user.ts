import { useContext } from "react";
import { AuthContext } from "../auth/auth-context";

export function useCurrentUser() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useCurrentUser must be used inside AuthProvider"
        );
    }

    return context.user;
}