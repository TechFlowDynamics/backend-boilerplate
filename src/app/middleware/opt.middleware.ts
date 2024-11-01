import { Request, Response, NextFunction } from "express";
import { getErrorMessage } from "../../core/handlers/error.handlers";

export const otpSend = async (
  req: Request,
  Response: Response,
  next: NextFunction,
) => {
  try {
    const value = req.body.value;
    if (!value) {
      return false;
    }

    if (value.lastMiddleware === "phoneSender") {
      return true;
    }
    next();
  } catch (err) {
    const message = getErrorMessage(err);
    console.error("Error: ", message);
  }
};
