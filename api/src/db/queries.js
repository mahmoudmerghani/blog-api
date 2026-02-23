import { prisma } from "../../lib/prisma.js";

async function getAllBlogs() {
    const blogs = await prisma.blog.findMany();

    return blogs;
}

async function getAllBlogsMetadata() {
    const blogs = await prisma.blog.findMany({
        select: {
            id: true,
            title: true,
            isPublished: true,
            creatorId: true,
            createdAt: true,
            editedAt: true,
        },
        where: {
            isPublished: true,
        },
    });

    return blogs;
}

async function getUserByUsername(username) {
    const user = await prisma.user.findFirst({
        where: {
            username,
        },
    });

    return user;
}

async function getBlog(id) {
    const blog = await prisma.blog.findFirst({
        where: {
            id,
            isPublished: true,
        },
    });

    return blog;
}

async function createUser({ fullName, username, password }) {
    const user = await prisma.user.create({
        data: {
            fullName,
            username,
            password,
        },
    });

    return user;
}

async function createBlog({ title, content, creatorId }) {
    const blog = await prisma.blog.create({
        data: {
            title,
            content,
            creatorId,
        },
    });

    return blog;
}

async function getUserById(id) {
    const user = await prisma.user.findFirst({
        where: {
            id,
        },
    });

    return user;
}

async function updateBlog(id, { title, content }) {
    const blog = await prisma.blog.update({
        data: {
            title,
            content,
            editedAt: new Date(),
        },

        where: {
            id,
        },
    });

    return blog;
}

async function updateBlogPublishedState(id, isPublished) {
    const blog = await prisma.blog.update({
        data: {
            isPublished,
        },

        where: {
            id,
        },
    });

    return blog;
}

async function deleteBlog(id) {
    const blog = await prisma.blog.delete({
        where: {
            id,
        },
    });

    return blog;
}

export default {
    getAllBlogs,
    getAllBlogsMetadata,
    getBlog,
    getUserByUsername,
    createUser,
    createBlog,
    getUserById,
    updateBlog,
    updateBlogPublishedState,
    deleteBlog,
};
