import { useState, useEffect } from "react";
import { Outlet, Link, NavLink, useLocation } from "react-router-dom";
import "./Layout.css";

export default function Layout() {
    const [shifted, setShifted] = useState(false);
    const location = useLocation();
    const isHome = location.pathname === "/";

    useEffect(() => {
        if (!isHome) setShifted(false);
    }, [isHome]);

    function handleLogoClick(e) {
        if (isHome) {
            e.preventDefault();
            setShifted((s) => !s);
        }
    }

    return (
        <div className="site-wrapper">
            <header className="site-header">
                <div className="header-inner">
                    <Link
                        to="/"
                        className={`site-logo${shifted ? " site-logo--shifted" : ""}`}
                        onClick={handleLogoClick}
                        aria-label={shifted ? "wiseBit" : "Bitwise"}
                        title={
                            isHome
                                ? shifted
                                    ? "Click to unshift"
                                    : "Click to shift"
                                : ""
                        }
                    >
                        <span className="logo-window">
                            <span
                                className={`logo-track${shifted ? " logo-track--shifted" : ""}`}
                            >
                                BitwiseBitwise
                            </span>
                        </span>
                        <span className="site-logo-op">
                            {shifted ? ">>>" : "<<<"} 3
                        </span>
                    </Link>
                    <nav className="site-nav">
                        <NavLink
                            to="/"
                            end
                            className={({ isActive }) =>
                                isActive ? "nav-link active" : "nav-link"
                            }
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/about"
                            className={({ isActive }) =>
                                isActive ? "nav-link active" : "nav-link"
                            }
                        >
                            About
                        </NavLink>
                    </nav>
                </div>
            </header>

            <main className="site-main">
                <div className="content-container">
                    <Outlet />
                </div>
            </main>

            <footer className="site-footer">
                <p>
                    &copy; {new Date().getFullYear()} My Blog. All rights
                    reserved.
                </p>
            </footer>
        </div>
    );
}
