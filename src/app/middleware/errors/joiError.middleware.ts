// src/errors/joiError.ts
import { GeneralError } from "./index";

class JoiValidationError extends GeneralError {
  constructor(public message: any) {
    super("Joi validation error");
  }

  getCode(): number {
    return 406; // HTTP Status Code for Not Acceptable
  }
}

export { JoiValidationError };
