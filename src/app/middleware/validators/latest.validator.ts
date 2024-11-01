// src/middleware/validators/user.validator.ts
import { Request, Response, NextFunction } from "express";
import { userSchema } from "../../../data/validationSchema/userSchema.validator";
import { validateRequest } from "../../../core/utils/validateRequest.utils";

export const userStepsOne = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const payload = req.body;
  const validatedValue = validateRequest(userSchema, payload);

  if (validatedValue) {
    req.value = validatedValue;
    next();
  }
};
