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

export const createRoomSchema = Joi.object({
  roomName: Joi.string().min(3).max(50).required().messages({
    "string.min": "Room name must be at least {#limit} characters long.",
    "string.max": "Room name must not exceed {#limit} characters.",
    "string.empty": "Room name is required.",
  }),
  questionId: Joi.string().required().messages({
    "string.empty": "Question ID is required.",
  }),
  status: Joi.string().valid("public", "private").required().messages({
    "any.only": "Status must be either 'public' or 'private'.",
    "string.empty": "Status is required.",
  }),
  roomOwner: Joi.string().required().messages({
    "string.empty": "Room owner is required.",
  }),
  startTime: Joi.date().iso().required().messages({
    "date.format": "Start time must be in ISO format",
    "date.empty": "Start time is required.",
  }),
  endTime: Joi.date().iso().required().messages({
    "date.format": "End time must be in ISO format",
    "date.empty": "End time is required.",
  }),
});

export const joinRoomSchema = Joi.object({
  roomCode: Joi.string().length(6).required().messages({
    "string.length": "Room code must be exactly 6 characters long.",
    "string.empty": "Room code is required.",
  }),
});