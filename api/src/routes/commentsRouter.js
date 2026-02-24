import express from "express";
import commentsController from "../controllers/commentsController.js";
import { validateCommentId } from "../middleware/commentValidations.js";
import { handleValidationErrors } from "../middleware/errorHandlingMiddleware.js";
import { requireAuth, loadUser } from "../middleware/authMiddleware.js";
import { requireAdmin } from "../middleware/authorizationMiddleware.js";

const commentsRouter = express.Router();

commentsRouter.get(
    "/:commentId",
    validateCommentId,
    handleValidationErrors,
    commentsController.getComment,
);

commentsRouter.delete(
    "/:commentId",
    requireAuth,
    loadUser,
    requireAdmin,
    validateCommentId,
    handleValidationErrors,
    commentsController.deleteComment,
);

export default commentsRouter;
