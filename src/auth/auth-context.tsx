import { createContext } from "react";
import type { User } from "../types/auth";

export type AuthContextValue = {
    user: User | null;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

