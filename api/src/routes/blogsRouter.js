import express from "express";
import blogsController from "../controllers/blogsController.js";
import { requireAuth, loadUser } from "../middleware/authMiddleware.js";
import { requireAdmin } from "../middleware/authorizationMiddleware.js";
import {
    validateBlog,
    validateBlogId,
    validateIsPublished,
} from "../middleware/blogValidations.js";
import { handleValidationErrors } from "../middleware/errorHandlingMiddleware.js";

const blogsRouter = express.Router();

const isAdmin = [requireAuth, loadUser, requireAdmin];

blogsRouter.get("/", blogsController.getAllBlogsMetadata);
blogsRouter.get(
    "/:blogId",
    validateBlogId,
    handleValidationErrors,
    blogsController.getBlog,
);

blogsRouter.post(
    "/",
    isAdmin,
    validateBlog,
    handleValidationErrors,
    blogsController.createBlog,
);

blogsRouter.put(
    "/:blogId",
    isAdmin,
    validateBlogId,
    validateBlog,
    handleValidationErrors,
    blogsController.updateBlog,
);

blogsRouter.patch(
    "/:blogId/published",
    isAdmin,
    validateBlogId,
    validateIsPublished,
    handleValidationErrors,
    blogsController.updateBlogPublishedState,
);

blogsRouter.delete(
    "/:blogId",
    isAdmin,
    validateBlogId,
    handleValidationErrors,
    blogsController.deleteBlog,
);

export default blogsRouter;
