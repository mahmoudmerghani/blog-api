import { body } from "express-validator";
import queries from "../db/queries.js";


export const validateUser = [
    body("fullName")
        .trim()
        .notEmpty()
        .withMessage("Full name cannot be empty")
        .isString()
        .withMessage("Full name must be a string"),
    body("username")
        .trim()
        .notEmpty()
        .withMessage("Username cannot be empty")
        .isString()
        .withMessage("Username must be a string")
        .custom(async (value) => {
            const user = await queries.getUserByUsername(value);
            if (user)
                throw new Error("User already exists with the same username");
        }),
    body("password")
        .notEmpty()
        .withMessage("Password cannot be empty")
        .isString()
        .withMessage("Password must be a string")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
    body("passwordConfirm")
        .notEmpty()
        .withMessage("Password cannot be empty")
        .isString()
        .withMessage("Password must be a string")
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Passwords do not match");
            }

            return true;
        }),
];

export const validateLogin = [
    body("username")
        .trim()
        .notEmpty()
        .withMessage("Username cannot be empty")
        .isString()
        .withMessage("Username must be a string"),
    body("password")
        .notEmpty()
        .withMessage("Password cannot be empty")
        .isString()
        .withMessage("Password must be a string"),
];

