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
  roomName: Joi.string().max(100).required().messages({
    "string.max": "Room name must not exceed {#limit} characters.",
    "string.empty": "Room name is required.",
  }),
  questionIds: Joi.array().items(Joi.string().required()).min(1).required().messages({
    "array.min": "At least one question ID is required.",
    "array.base": "Question IDs must be an array of strings.",
  }),
  type: Joi.string().valid("public", "private").required().messages({
    "any.only": "Type must be either 'public' or 'private'.",
    "string.empty": "Type is required.",
  }),
  roomSize: Joi.number().integer().min(1).required().messages({
    "number.base": "Room size must be a number.",
    "number.min": "Room size must be at least {#limit}.",
    "number.empty": "Room size is required.",
  }),
  credits: Joi.string().required().messages({
    "string.empty": "Credits are required.",
  }),
  startTime: Joi.date().iso().required().messages({
    "date.format": "Start time must be in ISO 8601 date format.",
    "date.empty": "Start time is required.",
  }),
  endTime: Joi.date().iso().required().messages({
    "date.format": "End time must be in ISO 8601 date format.",
    "date.empty": "End time is required.",
  }),
});
export const joinRoomSchema = Joi.object({
  roomCode: Joi.string().length(6).required().messages({
    "string.length": "Room code must be exactly 6 characters long.",
    "string.empty": "Room code is required.",
  }),
});
