import queries from "../db/queries.js";

async function getAllBlogsMetadata(req, res) {
    const blogs = await queries.getAllBlogsMetadata();

    res.json(blogs);
}

async function getBlog(req, res) {
    let { blogId } = req.params;
    blogId = Number(blogId);

    if (!Number.isInteger(blogId) || blogId < 0) {
        return res.status(400).json({ error: "Invalid blogId" });
    }

    const blog = await queries.getBlog(Number(blogId));

    if (!blog) return res.status(404).json({ error: "Not found" });

    res.json(blog);
}

async function createBlog(req, res) {
    
}

export default {
    getAllBlogsMetadata,
    getBlog,
};
