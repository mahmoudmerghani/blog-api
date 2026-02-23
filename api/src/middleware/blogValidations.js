import sanitizeHtml from "sanitize-html";
import { body, param } from "express-validator";

const sanitizeHtmlOptions = {
    allowedTags: [
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "p",
        "br",
        "strong",
        "em",
        "u",
        "s",
        "ul",
        "ol",
        "li",
        "a",
        "img",
        "blockquote",
        "pre",
        "code",
    ],
    allowedAttributes: {
        a: ["href", "target", "rel"],
        img: ["src", "alt", "width", "height"],
        "*": ["class"],
    },
    allowedSchemes: ["https", "http", "mailto"],
};

export const validateBlog = [
    body("title")
        .trim()
        .notEmpty()
        .withMessage("Title cannot be empty")
        .isString()
        .withMessage("Title must be a string")
        .isLength({ max: 255 })
        .withMessage("Title must be 255 characters or fewer"),
    body("content")
        .notEmpty()
        .withMessage("Content cannot be empty")
        .isString()
        .withMessage("Content must be a string")
        .customSanitizer((value) => sanitizeHtml(value, sanitizeHtmlOptions)),
];

export const validateBlogId = [
    param("blogId")
        .isInt({ gt: 0 })
        .withMessage("blogId must be a positive integer")
        .toInt(),
];

export const validateIsPublished = [
    [
        body("isPublished")
            .isBoolean()
            .withMessage("isPublished must be a boolean")
            .toBoolean(),
    ],
];
