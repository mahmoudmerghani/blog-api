import { createContext, useEffect, useState, useContext } from "react";
import useApi from "../api/useApi";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem("token"));
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { request } = useApi();

    function login(token, user) {
        setToken(token);
        setUser(user);
        localStorage.setItem("token", token);
    }

    function logout() {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
    }

   async function getUser() {
        if (!token) {
            setIsLoading(false);
            setError(null);
            return;
        }

        setError(null);
        setIsLoading(true);
        await request({
            url: "/api/auth/me",
            headers: { Authorization: `Bearer ${token}` },
            onSuccess: (data) => setUser(data.user),
            onError: (msg, status) => {
                if (status === 401) {
                    logout();
                    setError(null);
                } else {
                    setError(msg);
                }
            },
        });

        setIsLoading(false);
    }

    useEffect(() => {
        getUser();
    }, []);

    return (
        <AuthContext.Provider value={{ token, user, login, logout, isLoading, error, getUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
