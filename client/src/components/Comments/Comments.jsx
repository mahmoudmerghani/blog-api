import { useEffect } from "react";
import useApi from "../../api/useApi";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";
import "./Comments.css";

// trigger key is used to reload comments when a new comment is made
export default function Comments({ blogId, triggerKey, isEditMode = false, onDeleteComment, isDeleting = false }) {
    const {
        data: comments,
        error: fetchError,
        isLoading: isFetchLoading,
        request: fetchComments,
    } = useApi({ isLoadingInitialValue: true });

    function getComments() {
        fetchComments({ url: `/api/blogs/${blogId}/comments` });
    }

    useEffect(() => {
        getComments();
    }, [blogId, triggerKey]);

    if (fetchError) {
        return <Error error={fetchError} onTryAgain={getComments} />;
    }

    if (isFetchLoading) {
        return <Loading />;
    }

    return (
        <section className="comments">
            <h2 className="comments-heading">
                Comments ({comments.length})
                {isDeleting && <span className="comments-deleting">Deleting...</span>}
            </h2>
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
                                {isEditMode && (
                                    <button
                                        className="comment-delete-btn"
                                        onClick={() => onDeleteComment(comment.id)}
                                        disabled={isDeleting}
                                    >
                                        Delete
                                    </button>
                                )}
                            </div>
                            <p className="comment-content">{comment.content}</p>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
}
