import { useState } from "react";
import useApi from "../../api/useApi";
import { useAuth } from "../../contexts/authContext";
import { Navigate, useNavigate } from "react-router-dom";
import "./LoginPage.css";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login, user } = useAuth();
    const { error, isLoading, request } = useApi();
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        request({
            url: "/api/auth/login",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
            onSuccess: (data) => {
                console.log(data);
                login(data.token, data.user);
                navigate("/admin", { replace: true });
            },
        });
    }

    if (user) {
        return <Navigate to="/admin" replace />;
    }

    return (
        <div className="login-wrapper">
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="login-header">
                    <h1 className="login-title">Admin Login</h1>
                    <p className="login-subtitle">Bitwise dashboard</p>
                </div>

                <div className="login-fields">
                    <div className="login-field">
                        <label className="login-label" htmlFor="username">
                            Username
                        </label>
                        <input
                            id="username"
                            className="login-input"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            autoComplete="username"
                            autoFocus
                        />
                    </div>
                    <div className="login-field">
                        <label className="login-label" htmlFor="password">
                            Password
                        </label>
                        <input
                            id="password"
                            className="login-input"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="current-password"
                        />
                    </div>
                </div>

                {error && <p className="login-error">{error}</p>}

                <button
                    className="login-submit"
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? "Logging in..." : "Log in"}
                </button>
            </form>
        </div>
    );
}
