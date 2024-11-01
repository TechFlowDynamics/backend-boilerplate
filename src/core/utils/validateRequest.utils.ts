// src/utils/validateRequest.ts
import Joi from "joi";
import { defaults } from "../constants/validation.interface";
import {
  CustomError,
  getErrorCode,
  getErrorMessage,
} from "../handlers/error.handlers";

export const validateRequest = (schema: Joi.ObjectSchema, payload: any) => {
  const { error, value } = schema.validate(payload, defaults);

  if (error) {
    const code = getErrorCode(error) as number;
    const message = getErrorMessage(error);
    throw new CustomError(message, code.toString());
  }

  return value;
};
