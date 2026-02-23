import express from "express";
import blogsRouter from "./routes/blogsRouter.js";
import authRouter from "./routes/authRouter.js";

const app = express();

app.use(express.json());

app.use("/api/blogs", blogsRouter);
app.use("/api/auth", authRouter);

app.listen(8080);
