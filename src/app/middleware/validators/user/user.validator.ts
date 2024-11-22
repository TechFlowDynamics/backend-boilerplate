import { NextFunction, Request, Response } from "express";
import { getUserValidationFunc } from "../../../../data/validators/functions/userValidation.function";

export const getUserValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const payload = req.query;
  const validatedValue = getUserValidationFunc(payload);

  if (validatedValue) {
    req.value = validatedValue;
    next();
  }
};
