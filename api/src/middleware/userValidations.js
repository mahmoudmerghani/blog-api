import { body, validationResult } from "express-validator";

export const validateUser = [
    body("firstName")
        .trim()
        .notEmpty()
        .withMessage("First name cannot be empty")
        .isString()
        .withMessage("First name must be a string"),
    body("lastName")
        .trim()
        .notEmpty()
        .withMessage("Last name cannot be empty")
        .isString()
        .withMessage("Last name must be a string"),
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

export function handleValidationErrors(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    next();
}
