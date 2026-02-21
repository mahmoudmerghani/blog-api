import express from "express";
import authController from "../controllers/authController.js";
import {
    validateUser,
    validateLogin,
    handleValidationErrors,
} from "../middleware/userValidations.js";

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
