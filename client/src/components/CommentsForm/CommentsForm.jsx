import { useState } from "react";
import useApi from "../../api/useApi";
import "./CommentsForm.css";

export default function CommentsForm({ blogId, onCommentPosted }) {
    const [username, setUsername] = useState("");
    const [content, setContent] = useState("");
    const { data, error, isLoading, request } = useApi();

    function handleSubmit(e) {
        e.preventDefault();
        request({
            url: `/api/blogs/${blogId}/comments`,
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, content }),
            onSuccess: () => {
                setUsername("");
                setContent("");
                onCommentPosted();
            },
        });
    }

    return (
        <form className="comment-form" onSubmit={handleSubmit}>
            <h3 className="comment-form-title">Leave a comment</h3>
            <div className="comment-form-fields">
                <input
                    className="comment-input"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    maxLength={64}
                />
                <textarea
                    className="comment-input comment-textarea"
                    placeholder="Write your comment..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    rows={4}
                />
            </div>
            {error && <p className="comment-error">{error}</p>}
            {data && !error && <p className="comment-success">Comment posted!</p>}
            <button
                className="comment-submit"
                type="submit"
                disabled={isLoading}
            >
                {isLoading ? "Posting..." : "Post Comment"}
            </button>
        </form>
    );
}
