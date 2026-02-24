import express from "express";
import blogsRouter from "./routes/blogsRouter.js";
import authRouter from "./routes/authRouter.js";
import commentsRouter from "./routes/commentsRouter.js";

const app = express();

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/blogs", blogsRouter);
app.use("/api/comments", commentsRouter);

app.use((req, res) => {
    res.status(404).json({ error: "Not found" });
})

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: "Server error" });
})


app.listen(8080);
