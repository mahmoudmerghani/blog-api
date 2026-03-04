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
        setError(null);
        setIsLoading(false);
        localStorage.setItem("token", token);
    }

    function logout() {
        setToken(null);
        setUser(null);
        setError(null);
        setIsLoading(false);
        localStorage.removeItem("token");
    }

    async function getUser() {
        setError(null);
        setUser(null);

        if (!token) {
            setToken(null);
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        await request({
            url: "/api/auth/me",
            headers: { Authorization: `Bearer ${token}` },
            onSuccess: (data) => setUser(data),
            onError: (msg, status) => {
                if (status !== 401) {
                    setError(msg);
                }
            },
        });

        setIsLoading(false);
    }

    useEffect(() => {
        useApi.addGlobalResponseHandler((res) => {
            if (res.status === 401) {
                logout();
            }
        });
    }, []);

    useEffect(() => {
        getUser();
    }, []);

    return (
        <AuthContext.Provider
            value={{ token, user, login, logout, isLoading, error, getUser }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
