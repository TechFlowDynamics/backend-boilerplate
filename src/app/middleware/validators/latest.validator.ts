// src/middleware/validators/user.validator.ts
import { Request, Response, NextFunction } from "express";
import {
  userSchema,
  userStepTwoSchema,
} from "../../../data/validationSchema/userSchema.validator";
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

export const userStepTwo = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const payload = req.body;
  const validatedValue = validateRequest(userStepTwoSchema, payload);

  if (validatedValue) {
    req.value = validatedValue;
    next();
  }
};

export const loginValidate = (
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
