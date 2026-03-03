import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./pages/Layout/Layout";
import HomePage from "./pages/HomePage/HomePage";
import AboutPage from "./pages/AboutPage/AboutPage";
import BlogPage from "./pages/BlogPage/BlogPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import AdminBlogsPage from "./pages/AdminBlogsPage/AdminBlogsPage";
import { AuthProvider } from "./contexts/authContext";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/blogs/:blogId" element={<BlogPage />} />
                        <Route path="/admin/login" element={<LoginPage />} />
                        <Route path="/admin" element={<Navigate to="/admin/blogs" replace />} />
                        <Route
                            path="/admin/blogs"
                            element={
                                <ProtectedRoute>
                                    <AdminBlogsPage />
                                </ProtectedRoute>
                            }
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}
