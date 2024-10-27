import { Request, Response, NextFunction } from "express";
import { AWSSendSMS } from "../../core/scripts/twillio.init";
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
    if (value.phoneSender) {
      await AWSSendSMS({
        phoneNumber: `${value.countryCode}${value.phoneNumber}`,
        code: value.code,
      });
    }

    if (value.lastMiddleware === "phoneSender") {
      return true;
    }
    next();
    // await service.AWSSendSMS({ code, phoneNumber });
  } catch (err) {
    const message = getErrorMessage(err);
    console.error("Error: ", message);
  }
};
