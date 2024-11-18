// src/validationSchemas/userSchema.ts
import Joi from "joi";

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

export const loginSchema = Joi.object({
  email: Joi.string().lowercase().email().required(),
  password: Joi.string().min(8).trim().required(),
});
