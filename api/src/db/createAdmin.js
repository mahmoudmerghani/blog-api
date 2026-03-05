import queries from "./queries.js";
import { prisma } from "../../lib/prisma.js";
import bcrypt from "bcryptjs";

const fullName = process.env.FULL_NAME;
const username = process.env.USERNAME;
const password = process.env.PASSWORD;

async function main() {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await queries.createUser({
        fullName,
        username,
        password: hashedPassword,
    });

    const admin = await prisma.user.update({
        data: {
            isAdmin: true,
        },
        where: {
            id: user.id,
        },
    });

    console.log("done", admin);
}

main();
