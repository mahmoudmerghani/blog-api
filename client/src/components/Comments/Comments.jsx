import { useEffect } from "react";
import useApi from "../../api/useApi";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";
import "./Comments.css";

// trigger key is used to reload comments when a new comment is made
export default function Comments({ blogId, triggerKey }) {
    const { data: comments, error, isLoading, request } = useApi();

    function getComments() {
        request({ url: `/api/blogs/${blogId}/comments` });
    }

    useEffect(() => {
        getComments();
    }, [blogId, triggerKey]);

    if (error) {
        return <Error error={error} onTryAgain={getComments} />;
    }

    if (isLoading || !comments) {
        return <Loading />;
    }

    return (
        <section className="comments">
            <h2 className="comments-heading">Comments ({comments.length})</h2>
            <div className="comments-list">
                {comments.length === 0 ? (
                    <p className="comments-empty">
                        No comments yet. Be the first!
                    </p>
                ) : (
                    comments.map((comment) => (
                        <div key={comment.id} className="comment-card">
                            <div className="comment-meta">
                                <span className="comment-username">
                                    {comment.username}
                                </span>
                                <span className="comment-date">
                                    {new Intl.DateTimeFormat(undefined, {
                                        dateStyle: "medium",
                                    }).format(new Date(comment.createdAt))}
                                </span>
                            </div>
                            <p className="comment-content">{comment.content}</p>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
}
