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
