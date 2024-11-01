// src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from "express";
import customLogger from "../../middleware/logger.middleware"; // Import custom logger
import mongoose from "mongoose";
import {
  ApplicationError,
  BadRequest,
  GeneralError,
  InsufficientAccessError,
  NotFound,
  Unauthorized,
} from "../errors"; // Import your custom error classes
import { JoiValidationError } from "./joiError.middleware";
import { responseHandler } from "../../../core/handlers/response.handlers";

// Error handling middleware
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Log the error
  customLogger.error(`Error handler ${err.message || "Unknown error"}`);

  // Handle Joi validation errors
  if (err instanceof JoiValidationError) {
    const messages = err.message.map((detail: any) => detail.message);
    const data = {
      status: "error",
      statusCode: err.getCode(),
      details: messages,
    };
    return responseHandler(res, data, err.getCode(), "Joi Validation Error");
  }
  if (
    err instanceof BadRequest ||
    err instanceof ApplicationError ||
    err instanceof InsufficientAccessError ||
    err instanceof Unauthorized ||
    err instanceof NotFound
  ) {
    const messages = err.message;
    const data = {
      status: "error",
      statusCode: err.getCode(),
      details: messages,
    };
    return responseHandler(res, data, err.getCode(), "Error");
  }

  // Handle custom GeneralErrors
  if (err instanceof GeneralError) {
    const data = {
      status: "error",
      statusCode: 400,
      details: err.message,
    };
    return responseHandler(res, data, 400, "General Error");
  }

  // Handle Mongoose validation errors
  if (err instanceof mongoose.Error.ValidationError) {
    const messages = Object.values(err.errors).map(error => error.message);
    const data = {
      status: "error",
      statusCode: 400,
      details: messages,
    };
    return responseHandler(res, data, 409, "Validation Error");
  }

  // Handle Mongoose Cast Errors
  if (err instanceof mongoose.Error.CastError) {
    const data = {
      status: "error",
      statusCode: 409,
      details: `Invalid ${err.path}: ${err.value}`,
    };
    return responseHandler(res, data, 409, "Cast Error");
  }

  // Handle Mongoose duplicate key errors
  if (err.code === 11000) {
    const data = {
      status: "error",
      statusCode: 409,
      details: err.keyValue,
    };
    return responseHandler(res, data, 409, "Duplicate key error");
  }

  // Handle other application errors
  const statusCode = err.status || 500;
  const message = err.message || "An unexpected error occurred";

  // Send error response
  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
};
