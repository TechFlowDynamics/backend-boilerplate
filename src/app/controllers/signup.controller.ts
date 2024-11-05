import { Response, Request, NextFunction } from "express";
import { signupServiceOne } from "../service/auth.service";
import { responseHandler } from "../../core/handlers/response.handlers";
import {
  CustomError,
  getErrorCode,
  getErrorMessage,
} from "../../core/handlers/error.handlers";

import { ResponseMessages } from "../../core/constants/cloud.constants";
import errorHandlerMiddleware from "../../core/handlers/mongooseError.handler";
import { getOTP } from "../service/otp.service";
import { Purpose } from "../../core/enum/auth.enum";
// import { NotFound } from "../middleware/errors";

export const registerOne = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body = req.value;
    const data = await signupServiceOne(body);
    const otp = await getOTP({
      email: data.email,
      purpose: Purpose.SIGNUP,
      userName: data.userName,
    });
    const value = {
      email: data.email,
      lastMiddleware: "emailSender",
      emailSender: true,
      code: otp.code,
    };
    console.log("🚀 ~ value:", value);

    req.body.value = value;

    responseHandler(
      res,
      { data },
      200,
      ResponseMessages.RES_MSG_USER_CREATED_SUCCESSFULLY_EN,
    );

    next();
  } catch (error) {
    console.log("🚀 ~ error:", error);

    const errorMongoose = errorHandlerMiddleware(error, res);
    let code = errorMongoose.statusCode;
    let message = errorMongoose.msg;
    if (errorMongoose.mongooseError) {
      return responseHandler(res, null, code, message);
    } else {
      code = getErrorCode(error) as number;
      message = getErrorMessage(error);
      return responseHandler(res, null, code, message);
    }
  }
};
