// src/utils/validateRequest.ts
import Joi from "joi";
import { defaults } from "../constants/validation.interface";
import { getErrorMessage } from "../handlers/error.handlers";
import { JoiValidationError } from "src/app/middleware/errors/joiError.middleware";

export const validateRequest = (schema: Joi.ObjectSchema, payload: any) => {
  const { error, value } = schema.validate(payload, defaults);

  if (error) {
    const message = getErrorMessage(error);
    throw new JoiValidationError(message);
  }

  return value;
};
