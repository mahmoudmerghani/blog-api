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
        },
    });

    return blog;
}

async function createUser({ firstName, lastName, username, password }) {
    const user = await prisma.user.create({
        data: {
            firstName,
            lastName,
            username,
            password,
        },
    });

    return user;
}

export default {
    getAllBlogs,
    getAllBlogsMetadata,
    getBlog,
    getUserByUsername,
    createUser
};
