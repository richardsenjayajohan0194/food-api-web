import type { ReactNode } from "react";
import { AuthContext } from "../auth/auth-context";
import type { User } from "../types/auth";

type AuthProviderProps = {
    children: ReactNode;
};

export function AuthProvider({
    children,
}: AuthProviderProps) {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    const storedUser = localStorage.getItem("User");
    const user = isAuthenticated && storedUser ? (JSON.parse(storedUser) as User) : null;

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    );
}