import queries from "../db/queries.js";

async function getCommentsForBlog(req, res) {
    const { blogId } = req.params;

    try {
        const comments = await queries.getCommentsForBlog(blogId);
        res.json(comments);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Server error" });
    }
}

async function getComment(req, res) {
    const { commentId } = req.params;

    try {
        const comment = await queries.getComment(commentId);

        if (!comment) {
            return res.status(404).json({ error: "Not found" });
        }

        res.json(comment);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Server error" });
    }
}

async function createComment(req, res) {
    const { blogId } = req.params;
    const { username, content } = req.body;

    try {
        const comment = await queries.createComment({ username, content, blogId });
        res.status(201).json(comment);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Server error" });
    }
}

async function deleteComment(req, res) {
    const { commentId } = req.params;

    try {
        const comment = await queries.deleteComment(commentId);
        res.json(comment);
    } catch (e) {
        res.status(404).json({ error: "Not found" });
    }
}

export default {
    getCommentsForBlog,
    getComment,
    deleteComment,
    createComment,
};
