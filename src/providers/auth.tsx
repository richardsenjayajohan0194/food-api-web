import type { ReactNode } from "react";
import { AuthContext } from "../auth/auth-context";
import { mockUser } from "../auth/auth-mock";

type AuthProviderProps = {
    children: ReactNode;
};

export function AuthProvider({
    children,
}: AuthProviderProps) {
    const user = mockUser;

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    );
}