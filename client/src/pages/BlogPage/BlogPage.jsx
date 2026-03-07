import "./BlogPage.css";
import useApi from "../../api/useApi";
import { useParams } from "react-router-dom";
import Error from "../../components/Error/Error";
import Loading from "../../components/Loading/Loading";
import Comments from "../../components/Comments/Comments";
import CommentsForm from "../../components/CommentsForm/CommentsForm";
import { useEffect, useState } from "react";
import useDocumentTitle from "../../hooks/useDocumentTitle";

export default function BlogPage() {
    const { data: blog, error, isLoading, request } = useApi();
    const { blogId } = useParams();
    // for reloading comments when a new comment is made
    const [refreshComments, setRefreshComments] = useState(0); 

    useDocumentTitle(blog?.title ? blog.title : "Loading...");

    function getBlog() {
        request({ url: `/api/blogs/${blogId}` });
    }

    useEffect(() => {
        getBlog();
    }, [blogId]);

    if (isLoading || !blog) {
        return <Loading />;
    }

    if (error) {
        return <Error error={error} onTryAgain={getBlog} />;
    }

    const fmt = (d) =>
        new Intl.DateTimeFormat(undefined, { dateStyle: "long" }).format(
            new Date(d),
        );

    return (
        <article className="blog-post">
            <header className="blog-post-header">
                <h1 className="blog-post-title">{blog.title}</h1>
                <div className="blog-post-dates">
                    <p className="blog-post-date">
                        Published {fmt(blog.createdAt)}
                    </p>
                    {blog.editedAt && (
                        <p className="blog-post-date blog-post-date--edited">
                            Updated {fmt(blog.editedAt)}
                        </p>
                    )}
                </div>
            </header>
            <div
                className="blog-post-content"
                dangerouslySetInnerHTML={{ __html: blog.content }}
            />
            <CommentsForm blogId={blogId} onCommentPosted={() => setRefreshComments((k) => k + 1)} />
            <Comments blogId={blogId} triggerKey={refreshComments}/>
        </article>
    );
}
