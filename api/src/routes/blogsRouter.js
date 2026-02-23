import express from "express";
import blogsController from "../controllers/blogsController.js";
import {
    requireAuth,
    loadUser,
    optionalAuth,
    loadUserIfExists,
} from "../middleware/authMiddleware.js";
import { requireAdmin } from "../middleware/authorizationMiddleware.js";
import {
    validateBlog,
    validateBlogId,
    validateIsPublished,
} from "../middleware/blogValidations.js";
import { handleValidationErrors } from "../middleware/errorHandlingMiddleware.js";

const blogsRouter = express.Router();

const isAdmin = [requireAuth, loadUser, requireAdmin];

// GET / and /:blogId will respond differently depending on if the user
// is admin or anonymous
blogsRouter.get(
    "/",
    optionalAuth,
    loadUserIfExists,
    blogsController.getAllBlogsMetadata,
);
blogsRouter.get(
    "/:blogId",
    optionalAuth,
    loadUserIfExists,
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
