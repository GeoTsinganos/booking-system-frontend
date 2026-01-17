import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";
import axios from "axios";

type MeResponse = {
    id: number;
    username: string;
    is_staff: boolean;
    is_superuser: boolean;
};

interface AuthContextType {
    user: string | null;
    isAdmin: boolean;
    loading: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    refreshMe: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<string | null>(localStorage.getItem("user"));
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    const logout = () => {
        localStorage.clear();
        setUser(null);
        setIsAdmin(false);
        setLoading(false);
    };

    const refreshMe = async () => {
        const token = localStorage.getItem("access");
        if (!token) {
            setUser(null);
            setIsAdmin(false);
            setLoading(false);
            return;
        }

        setLoading(true);
        try {
            const res = await api.get<MeResponse>("auth/me/");
            setUser(res.data.username);
            setIsAdmin(Boolean(res.data.is_staff || res.data.is_superuser));
        } catch (err) {
            // αν έχει λήξει/άκυρο token, κάνουμε logout
            if (axios.isAxiosError(err) && err.response?.status === 401) {
                logout();
            } else {
                console.error(err);
                // αν κάτι πάει στραβά, μην αφήσεις admin=true
                setIsAdmin(false);
                setLoading(false);
            }
        } finally {
            setLoading(false);
        }
    };

    const login = async (username: string, password: string) => {
        setLoading(true);
        const res = await api.post("auth/login/", { username, password });

        localStorage.setItem("access", res.data.access);
        localStorage.setItem("refresh", res.data.refresh);
        localStorage.setItem("user", username);

        setUser(username);

        // fetch admin flag από backend
        await refreshMe();
    };

    useEffect(() => {
        // on app start, προσπάθησε να φορτώσεις το me (αν υπάρχει token)
        refreshMe();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <AuthContext.Provider value={{ user, isAdmin, loading, login, logout, refreshMe }}>
            {children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext)!;
