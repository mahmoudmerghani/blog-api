import { useEffect } from "react";
import useApi from "../../api/useApi";
import { Link } from "react-router-dom";
import Error from "../../components/Error/Error";
import Loading from "../../components/Loading/Loading";
import "./HomePage.css";

export default function HomePage() {
    const { data: blogs, error, isLoading, request } = useApi();

    function getBlogsMetadata() {
        request({ url: "/api/blogs" });
    }

    useEffect(() => {
        getBlogsMetadata();
    }, []);

    if (error) {
        return <Error error={error} onTryAgain={getBlogsMetadata} />;
    }

    if (isLoading || !blogs) {
        return <Loading />;
    }

    return (
        <div className="blogs">
            {blogs?.map((blog) => (
                <Link
                    to={`/blogs/${blog.id}`}
                    className="blog-card"
                    key={blog.id}
                >
                    <h2 className="blog-title">{blog.title}</h2>
                    {blog.summary && (
                        <p className="blog-summary">{blog.summary}</p>
                    )}
                    <div className="blog-info">
                        <p className="blog-time">
                            {new Intl.DateTimeFormat(undefined, {
                                dateStyle: "medium",
                            }).format(
                                new Date(blog.editedAt ?? blog.createdAt),
                            )}
                        </p>
                    </div>
                </Link>
            ))}
        </div>
    );
}
