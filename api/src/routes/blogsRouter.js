import express from "express";
import blogsController from "../controllers/blogsController.js";

const blogsRouter = express.Router();

blogsRouter.get("/", blogsController.getAllBlogsMetadata);
blogsRouter.get("/:blogId", blogsController.getBlog);

export default blogsRouter;