import express from "express";
import authController from "../controllers/authController.js";
import { validateUser, validateLogin } from "../middleware/userValidations.js";
import { handleValidationErrors } from "../middleware/errorHandlingMiddleware.js";
import { requireAuth, loadUser } from "../middleware/authMiddleware.js";

const authRouter = express.Router();

authRouter.post(
    "/login",
    validateLogin,
    handleValidationErrors,
    authController.login,
);

authRouter.post(
    "/signup",
    validateUser,
    handleValidationErrors,
    authController.signup,
);

authRouter.get("/me", requireAuth, loadUser, authController.getUser);

export default authRouter;
