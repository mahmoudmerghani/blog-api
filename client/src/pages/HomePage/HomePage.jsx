import { useEffect } from "react";
import useApi from "../../api/useApi";
import { Link } from "react-router-dom";
import Error from "../../components/Error/Error";
import Loading from "../../components/Loading/Loading";
import "./HomePage.css";

export default function HomePage() {
    const { data, error, isLoading, request } = useApi();

    async function getBlogsMetadata() {
        await request({ url: "/api/blogs" });
    }

    useEffect(() => {
        getBlogsMetadata();
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return <Error error={error} onTryAgain={getBlogsMetadata} />;
    }

    return (
        <div className="blogs">
            {data.map((blog) => (
                <Link to={`/blogs/${blog.id}`} className="blog-card">
                    <h2 className="blog-title">
                        {blog.title}
                    </h2>
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
