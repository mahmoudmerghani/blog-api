import queries from "../db/queries.js";
import * as cheerio from "cheerio";

function getBlogSummary(html, maxLength = 200) {
    const $ = cheerio.load(html);
    const firstParagraph = $("p").first().text().trim();
    const summary =
        firstParagraph.length > maxLength
            ? firstParagraph.slice(0, maxLength) + "..."
            : firstParagraph;

    return summary;
}

async function getAllBlogsMetadata(req, res) {
    const isAdmin = req.user?.isAdmin === true;

    try {
        const blogs = await queries.getAllBlogs({
            includeUnpublished: isAdmin,
        });

        blogs.forEach((blog) => {
            blog.summary = getBlogSummary(blog.content);
            delete blog.content; // remove content to keep the response size small
        });

        res.json(blogs);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Server error" });
    }
}

async function getBlog(req, res) {
    const isAdmin = req.user?.isAdmin === true;
    const { blogId } = req.params;

    try {
        const blog = await queries.getBlog(blogId, {
            includeUnpublished: isAdmin,
        });

        if (!blog) return res.status(404).json({ error: "Not found" });

        res.json(blog);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Server error" });
    }
}

async function createBlog(req, res) {
    const { title, content, isPublished } = req.body;
    const creatorId = req.user.id;

    try {
        const blog = await queries.createBlog({ title, content, isPublished, creatorId });
        res.status(201).json(blog);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Server error" });
    }
}

async function updateBlog(req, res) {
    const { title, content, isPublished } = req.body;
    const { blogId } = req.params;

    try {
        const blog = await queries.updateBlog(blogId, { title, content, isPublished });
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
