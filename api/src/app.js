import express from "express";
import blogsRouter from "./routes/blogsRouter.js";

const app = express();

app.use("/api/blogs", blogsRouter);

app.listen("8080");
