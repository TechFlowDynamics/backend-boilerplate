import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { defaults } from "../../../core/constants/validation.interface";

export const userstepsOne = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const schema = Joi.object({
    email: Joi.string().lowercase().email().required(),
    userName: Joi.string()
      .lowercase()
      .trim()
      .min(3)
      .regex(/^[\w](?!.*?\.{2})[\w.]{1,28}[\w]$/, "string"),
    password: Joi.string().min(8).trim().required(),
  });

  const payload = req.body;

  const { error, value } = schema.validate(payload, defaults);
  req.body = value;

  if (error) {
    return res.status(406).json({
      error: `Error in user data: ${error.message}`,
    });
  } else {
    next();
  }
};
