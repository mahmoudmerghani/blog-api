import queries from "../db/queries.js";
import jwt from "jsonwebtoken";

export function requireAuth(req, res, next) {
    const header = req.headers["authorization"];

    if (!header || !header.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Invalid token" });
    }

    const token = header.split(" ")[1];

    try {
        // data has only the user id
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.auth = data;
        next();
    } catch (e) {
        return res.status(401).json({ error: "Invalid token" });
    }
}

export async function loadUser(req, res, next) {
    if (req.auth?.sub === undefined) {
        return res.status(401).json({ error: "Unauthenticated" });
    }

    try {
        const user = await queries.getUserById(req.auth.sub);
        if (!user) {
            return res.status(400).json({ error: "Not found" });
        }

        req.user = user;
        next();
    } catch (e) {
        return res.status(500).json({ error: "Server error" });
    }
}
