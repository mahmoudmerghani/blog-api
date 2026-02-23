import queries from "../db/queries.js";

async function getAllBlogsMetadata(req, res) {
    const blogs = await queries.getAllBlogsMetadata();

    res.json(blogs);
}

async function getBlog(req, res) {
    const { blogId } = req.params;

    const blog = await queries.getBlog(blogId);

    if (!blog) return res.status(404).json({ error: "Not found" });

    res.json(blog);
}

async function createBlog(req, res) {
    const { title, content } = req.body;
    const creatorId = req.user.id;
    const blog = await queries.createBlog({ title, content, creatorId });

    res.status(201).json(blog);
}

async function updateBlog(req, res) {
    const { title, content } = req.body;
    const { blogId } = req.params;

    try {
        const blog = await queries.updateBlog(blogId, { title, content });
        return res.json(blog);
    } catch (e) {
        return res.status(404).json({ error: "Not found" });
    }
}

async function updateBlogPublishedState(req, res) {
    const { blogId } = req.params;
    const { isPublished } = req.body;

    try {
        const blog = await queries.updateBlogPublishedState(
            blogId,
            isPublished,
        );

        return res.json(blog);
    } catch (e) {
        return res.status(404).json({ error: "Not found" });
    }
}

async function deleteBlog(req, res) {
    const { blogId } = req.params;

    try {
        const blog = await queries.deleteBlog(blogId);
        return res.json(blog);
    } catch (e) {
        return res.status(404).json({ error: "Not found" });
    }
}

export default {
    getAllBlogsMetadata,
    getBlog,
    createBlog,
    updateBlog,
    updateBlogPublishedState,
    deleteBlog,
};
