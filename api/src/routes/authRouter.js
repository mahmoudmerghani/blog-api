import express from "express";
import authController from "../controllers/authController.js";
import {
    validateUser,
    validateLogin,
} from "../middleware/userValidations.js";
import { handleValidationErrors } from "../middleware/errorHandlingMiddleware.js";

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

export default authRouter;
