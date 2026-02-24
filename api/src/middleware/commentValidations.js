import { body, param } from "express-validator";

export const validateCommentId = [
    param("commentId")
        .isInt({ gt: 0 })
        .withMessage("commentId must be a positive integer")
        .toInt(),
];

export const validateComment = [
    body("username")
        .trim()
        .notEmpty()
        .withMessage("Username must not be empty")
        .isString()
        .withMessage("Username must be a string")
        .isLength({ max: 30 })
        .withMessage("Comment content must be 30 characters or fewer"),
    body("content")
        .trim()
        .notEmpty()
        .withMessage("Comment content must not be empty")
        .isString()
        .withMessage("Comment content must be a string")
        .isLength({ max: 255 })
        .withMessage("Comment content must be 255 characters or fewer"),
];
