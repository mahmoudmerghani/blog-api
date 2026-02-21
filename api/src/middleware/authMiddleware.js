import { verify } from "jsonwebtoken";

export function requireAuth(req, res, next) {
    const header = req.headers["Authorization"];

    if (!header || !header.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Invalid token" });
    }

    const token = header.split(" ")[1];

    try {
        const data = verify(token, process.env.JWT_SECRET);
        req.user = data;
        next();
    } catch (e) {
        return res.status(401).json({ error: "Invalid token" });
    }
}
