import "./BlogPage.css";
import useApi from "../../api/useApi";
import { useParams } from "react-router-dom";
import Error from "../../components/Error/Error";
import Loading from "../../components/Loading/Loading";
import { useEffect } from "react";

export default function BlogPage() {
    const { data, error, isLoading, request } = useApi();
    const { blogId } = useParams();

    function getBlog() {
        request({ url: `/api/blogs/${blogId}` });
    }

    useEffect(() => {
        getBlog();
    }, []);

    if (error) {
        return <Error error={error} onTryAgain={getBlog} />;
    }

    if (isLoading) {
        return <Loading />;
    }

    const fmt = (d) =>
        new Intl.DateTimeFormat(undefined, { dateStyle: "long" }).format(
            new Date(d),
        );

    return (
        <article className="blog-post">
            <header className="blog-post-header">
                <h1 className="blog-post-title">{data.title}</h1>
                <div className="blog-post-dates">
                    <p className="blog-post-date">Published {fmt(data.createdAt)}</p>
                    {data.editedAt && (
                        <p className="blog-post-date blog-post-date--edited">
                            Updated {fmt(data.editedAt)}
                        </p>
                    )}
                </div>
            </header>
            <div
                className="blog-post-content"
                dangerouslySetInnerHTML={{ __html: data.content }}
            />
        </article>
    );
}
