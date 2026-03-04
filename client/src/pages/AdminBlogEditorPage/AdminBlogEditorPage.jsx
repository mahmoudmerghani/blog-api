import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import useApi from "../../api/useApi";
import { useAuth } from "../../contexts/authContext";
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";
import Comments from "../../components/Comments/Comments";
import "./AdminBlogEditorPage.css";

const TINYMCE_CONTENT_STYLE = `
    body {
        background-color: #0f1117;
        color: #cbd5e0;
        font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
        font-size: 1rem;
        line-height: 1.85;
        padding: 1.25rem 1.5rem;
        margin: 0;
    }
    h1, h2, h3, h4 {
        color: #e2e8f0;
        font-weight: 700;
        line-height: 1.3;
        letter-spacing: -0.01em;
        margin-top: 0.5rem;
        margin-bottom: 0.25rem;
    }
    h1 { font-size: 1.75rem; }
    h2 { font-size: 1.4rem; }
    h3 { font-size: 1.15rem; }
    h4 { font-size: 1rem; }
    p { margin: 0 0 1.25rem 0; }
    a { color: #7c6af7; text-decoration: underline; text-underline-offset: 3px; }
    a:hover { color: #9d8fff; }
    strong { color: #e2e8f0; font-weight: 600; }
    em { color: #a0aec0; }
    ul, ol { padding-left: 1.5rem; margin-bottom: 1.25rem; }
    ul { list-style: disc; }
    ol { list-style: decimal; }
    li::marker { color: #7c6af7; }
    blockquote {
        border-left: 3px solid #7c6af7;
        padding: 0.75rem 1.25rem;
        background-color: rgba(124, 106, 247, 0.07);
        border-radius: 0 8px 8px 0;
        color: #94a3b8;
        font-style: italic;
        margin: 0 0 1.25rem 0;
    }
    code {
        font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace;
        font-size: 0.85em;
        background-color: #1e2433;
        color: #a89dfc;
        padding: 0.15em 0.45em;
        border-radius: 4px;
        border: 1px solid #2d3748;
    }
    pre {
        background-color: #161b27;
        border: 1px solid #2d3748;
        border-radius: 10px;
        padding: 1.25rem 1.5rem;
        overflow-x: auto;
        margin-bottom: 1.25rem;
    }
    pre code {
        background: none;
        border: none;
        padding: 0;
        color: #e2e8f0;
        font-size: 0.875rem;
        line-height: 1.7;
    }
    hr {
        border: none;
        border-top: 1px solid #2d3748;
        margin: 1.5rem 0;
    }
    img {
        max-width: 100%;
        border-radius: 8px;
        border: 1px solid #2d3748;
    }
`;

export default function AdminBlogEditorPage() {
    const { blogId } = useParams();
    const isEditMode = Boolean(blogId);
    const navigate = useNavigate();
    const { token } = useAuth();
    const editorRef = useRef(null);

    const [title, setTitle] = useState("");
    const [isPublished, setIsPublished] = useState(false);

    const [commentTrigger, setCommentsTrigger] = useState(0);

    const {
        data: blog,
        error: fetchError,
        isLoading: fetchLoading,
        request: fetchBlog,
    } = useApi({ isLoadingInitialValue: true });
    const {
        error: submitError,
        isLoading: submitLoading,
        request: submitBlog,
    } = useApi();
    const {
        error: deleteCommentError,
        isLoading: isDeleteCommentLoading,
        request: deleteComment,
    } = useApi();

    function getBlog() {
        fetchBlog({
            url: `/api/blogs/${blogId}`,
            headers: { Authorization: `Bearer ${token}` },
            onSuccess: (data) => {
                setTitle(data.title);
                setIsPublished(data.isPublished);
                editorRef.current?.setContent(data.content);
            },
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        const content = editorRef.current ? editorRef.current.getContent() : "";

        submitBlog({
            url: isEditMode ? `/api/blogs/${blogId}` : "/api/blogs",
            method: isEditMode ? "PUT" : "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ title, content, isPublished }),
            onSuccess: () => navigate("/admin/blogs"),
        });
    }

    function handleDeleteComment(commentId) {
        deleteComment({
            url: `/api/comments/${commentId}`,
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
            onSuccess: () => setCommentsTrigger((v) => v + 1),
        });
    }

    useEffect(() => {
        if (isEditMode) {
            getBlog();
        }
    }, [blogId]);

    if (isEditMode) {
        if (fetchLoading) return <Loading />;
        if (fetchError)
            return <Error error={fetchError} onTryAgain={getBlog} />;
    }

    return (
        <div className="editor-page">
            <div className="editor-page-header">
                <h1 className="editor-page-title">
                    {isEditMode ? "Edit Blog" : "New Blog"}
                </h1>
            </div>

            <form className="editor-form" onSubmit={handleSubmit}>
                <div className="editor-field">
                    <label className="editor-label" htmlFor="title">
                        Title
                    </label>
                    <input
                        id="title"
                        className="editor-input"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Blog title..."
                        required
                    />
                </div>

                <div className="editor-field">
                    <label className="editor-label">Content</label>
                    <div className="editor-tinymce-wrapper">
                        <Editor
                            tinymceScriptSrc="/tinymce/tinymce.min.js"
                            initialValue={blog?.content ?? ""}
                            onInit={(evt, editor) => {
                                editorRef.current = editor;
                            }}
                            init={{
                                height: 520,
                                menubar: false,
                                license_key: "gpl",
                                skin: "oxide-dark",
                                content_css: false,
                                content_style: TINYMCE_CONTENT_STYLE,
                                plugins: [
                                    "lists",
                                    "link",
                                    "image",
                                    "codesample",
                                    "code",
                                    "hr",
                                ],
                                toolbar:
                                    "undo redo | " +
                                    "bold italic | " +
                                    "h1 h2 h3 | " +
                                    "bullist numlist | " +
                                    "blockquote hr | " +
                                    "codesample link image | " +
                                    "code",
                                codesample_languages: [
                                    { text: "JavaScript", value: "javascript" },
                                    { text: "TypeScript", value: "typescript" },
                                    { text: "HTML", value: "html" },
                                    { text: "CSS", value: "css" },
                                    { text: "Python", value: "python" },
                                    { text: "Bash", value: "bash" },
                                    { text: "JSON", value: "json" },
                                ],
                                link_default_target: "_blank",
                                image_title: true,
                                automatic_uploads: false,
                                branding: false,
                                promotion: false,
                            }}
                        />
                    </div>
                </div>

                <div className="editor-footer">
                    <label className="editor-checkbox-label">
                        <input
                            type="checkbox"
                            className="editor-checkbox"
                            checked={isPublished}
                            onChange={(e) => setIsPublished(e.target.checked)}
                        />
                        Publish immediately
                    </label>

                    <div className="editor-actions">
                        {submitError && (
                            <p className="editor-submit-error">{submitError}</p>
                        )}
                        <button
                            type="button"
                            className="editor-cancel-btn"
                            onClick={() => navigate("/admin/blogs")}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="editor-submit-btn"
                            disabled={submitLoading}
                        >
                            {submitLoading
                                ? "Saving..."
                                : isEditMode
                                  ? "Save Changes"
                                  : "Create Blog"}
                        </button>
                    </div>
                </div>
            </form>

            {isEditMode && (
                <>
                    {deleteCommentError && (
                        <p className="editor-submit-error">{deleteCommentError}</p>
                    )}
                    <Comments
                        blogId={blogId}
                        triggerKey={commentTrigger}
                        isEditMode={true}
                        onDeleteComment={handleDeleteComment}
                        isDeleting={isDeleteCommentLoading}
                    />
                </>
            )}
        </div>
    );
}
