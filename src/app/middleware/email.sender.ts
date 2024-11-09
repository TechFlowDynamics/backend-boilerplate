import { NextFunction, Request, Response } from "express";
import { getErrorMessage } from "../../core/handlers/error.handlers";
import { userVerifyAccountTemplate } from "../../core/utils/emailTemplates.utils";
import { AWSSendMail } from "../../core/scripts/ses.init";

export const emailSender = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const value = req.body.value;
    if (!value) return false;
    let email;
    if (value.emailSender) {
      email = userVerifyAccountTemplate(value.email, value.code);
      AWSSendMail(email);
    }
    if (value.lastMiddleware === "emailSender") return true;
    next();
  } catch (err) {
    const message = getErrorMessage(err);
    console.error("Error: ", err, message);
  }
};
