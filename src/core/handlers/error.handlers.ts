import { HttpStatusCodes } from "../../core/constants/cloud.constants";
declare global {
  interface Error {
    code?: string;
  }
}

export class CustomError extends Error {
  code: string;

  constructor(message: string, code: string) {
    super(message);
    this.code = code;
    // Ensure correct prototype chain for instanceof checks
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

export const getErrorMessage = (e: unknown): string => {
  let message: string = "";
  if (typeof e === "string") {
    message = e.toUpperCase(); // works, `e` narrowed to string
  } else if (e instanceof Error) {
    message = e.message; // works, `e` narrowed to Error
  }
  return message;
};

export const getErrorCode = (e: unknown): number | undefined => {
  let code: string | undefined;
  if (e instanceof Error) {
    code = e.code; // works, `e` narrowed to Error
  }
  if (!code) {
    return 400;
  }
  return (HttpStatusCodes as Record<string, number>)[code] || 400;
};
export const getFirebaseErrorCode = (e: unknown): string => {
  let code: string | undefined;
  if (e instanceof Error) {
    code = e.code; // works, `e` narrowed to Error
  }
  return code || "INVALID_REQ_TYPE";
};
