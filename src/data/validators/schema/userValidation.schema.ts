// src/validationSchemas/userSchema.ts
import Joi from "joi";
import { Purpose } from "../../../core/enum/auth.enum";

export const userSchema = Joi.object({
  email: Joi.string().lowercase().email().required(),
  userName: Joi.string()
    .lowercase()
    .trim()
    .min(3)
    .regex(/^[\w](?!.*?\.{2})[\w.]{1,28}[\w]$/, "string"),
  password: Joi.string().min(8).trim().required(),
});

export const userStepTwoSchema = Joi.object({
  firstName: Joi.string().min(3).required(),
  lastName: Joi.string().min(2),
  phoneNumber: Joi.string().trim().required(),
  mimeType: Joi.string().required(),
  fileName: Joi.string().required(),
});
export const verifyOTPSchema = Joi.object({
  purpose: Joi.string()
    .valid(...Object.values(Purpose)) // Matches one of the Purpose enum values
    .required()
    .messages({
      "any.only": "Purpose must be one of the allowed values",
      "string.empty": "Purpose is required",
    }),
  email: Joi.string().lowercase().email().required().messages({
    "string.email": "Invalid email format",
    "string.empty": "Email is required",
  }),
  code: Joi.string().length(4).required().messages({
    "string.empty": "Code is required",
    "string.length": "Code must be at least 4 characters",
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string().lowercase().email().required(),
  password: Joi.string().min(8).trim().required(),
});

export const getUserSchema = Joi.object({
  username: Joi.string()
    .min(3)
    .max(30)
    .regex(/^[a-zA-Z0-9](?!.*[_.]{2})[a-zA-Z0-9_.]*[a-zA-Z0-9]$/)
    .messages({
      "string.pattern.base":
        "Username must start and end with an alphanumeric character, can include underscores (_) or periods (.), but not consecutively.",
      "string.min": "Username must be at least {#limit} characters long.",
      "string.max": "Username must not exceed {#limit} characters.",
      "string.empty": "Username cannot be empty.",
    }),
});
