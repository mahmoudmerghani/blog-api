import queries from "../db/queries.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

async function login(req, res) {
    const { username, password } = req.body;

    try {
        const user = await queries.getUserByUsername(username);

        if (!user) {
            return res.status(400).json({ error: "Invalid username" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid password" });
        }

        const token = jwt.sign(
            {
                sub: user.id,
            },
            process.env.JWT_SECRET,
            {
                algorithm: "HS256",
                expiresIn: 60 * 60 * 24 * 7,
            },
        );

        res.json({ token });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Server error" });
    }
}

async function signup(req, res) {
    try {
        const { fullName, username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await queries.createUser({
            fullName,
            username,
            password: hashedPassword,
        });

        res.status(201).json({
            id: user.id,
            username: user.username,
        });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: "Server error" });
    }
}

export default {
    login,
    signup,
};
