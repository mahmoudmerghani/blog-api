import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useApi from "../../api/useApi";
import { useAuth } from "../../contexts/authContext";
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";
import "./AdminBlogsPage.css";
import useDocumentTitle from "../../hooks/useDocumentTitle";

export default function AdminBlogsPage() {
    const { token } = useAuth();
    const { data: blogs, error, isLoading, request } = useApi({ isLoadingInitialValue: true });
    const { request: toggleRequest, isLoading: isToggling } = useApi();
    const { request: deleteRequest, isLoading: isDeleting } = useApi();
    const isActioning = isToggling || isDeleting;
    const [actionError, setActionError] = useState(null);

    useDocumentTitle("Admin Panel");

    function getBlogs() {
        request({
            url: "/api/blogs",
            headers: { Authorization: `Bearer ${token}` },
        });
    }

    useEffect(() => {
        getBlogs();
    }, []);

    function handleTogglePublished(blog) {
        setActionError(null);
        toggleRequest({
            url: `/api/blogs/${blog.id}/published`,
            method: "PATCH",
            body: JSON.stringify({ isPublished: !blog.isPublished }),
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            onSuccess: getBlogs,
            onError: (msg) => setActionError(msg),
        });
    }

    function handleDelete(blog) {
        if (!window.confirm(`Delete "${blog.title}"? This cannot be undone.`)) return;
        setActionError(null);
        deleteRequest({
            url: `/api/blogs/${blog.id}`,
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
            onSuccess: getBlogs,
            onError: (msg) => setActionError(msg),
        });
    }

    const fmt = (d) =>
        new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(new Date(d));

    if (isLoading) return <Loading />;
    if (error) return <Error error={error} onTryAgain={getBlogs} />;

    return (
        <div className="admin-blogs">
            <div className="admin-blogs-header">
                <h1 className="admin-blogs-title">All Blogs</h1>
                <Link to="/admin/blogs/new" className="admin-new-btn">
                    + New Blog
                </Link>
            </div>

            {actionError && <p className="admin-action-error">{actionError}</p>}

            {blogs?.length === 0 ? (
                <p className="admin-blogs-empty">No blogs yet.</p>
            ) : (
                <div className="admin-blog-list">
                    {blogs?.map((blog) => (
                        <div key={blog.id} className="admin-blog-row">
                            <div className="admin-blog-info">
                                <span className="admin-blog-row-title">{blog.title}</span>
                                <div className="admin-blog-meta">
                                    <span className={`admin-blog-badge ${blog.isPublished ? "admin-blog-badge--published" : "admin-blog-badge--draft"}`}>
                                        {blog.isPublished ? "Published" : "Draft"}
                                    </span>
                                    <span className="admin-blog-date">{fmt(blog.createdAt)}</span>
                                </div>
                            </div>
                            <div className="admin-blog-actions">
                                <Link
                                    to={`/admin/blogs/${blog.id}/edit`}
                                    className="admin-action-btn"
                                >
                                    Edit
                                </Link>
                                <button
                                    className="admin-action-btn"
                                    onClick={() => handleTogglePublished(blog)}
                                    disabled={isActioning}
                                >
                                    {blog.isPublished ? "Unpublish" : "Publish"}
                                </button>
                                <button
                                    className="admin-action-btn admin-action-btn--danger"
                                    onClick={() => handleDelete(blog)}
                                    disabled={isActioning}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
