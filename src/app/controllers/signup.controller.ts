import { Response, Request, NextFunction } from "express";
import { signupServiceOne } from "../service/auth.service";
import { responseHandler } from "../../core/handlers/response.handlers";
import {
  getErrorCode,
  getErrorMessage,
} from "../../core/handlers/error.handlers";

import { ResponseMessages } from "../../core/constants/cloud.constants";
import errorHandlerMiddleware from "../../core/handlers/mongooseError.handler";

export const registerOne = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body = req.body;
    console.log("🚀 ~ body:", body);
    const data = await signupServiceOne(body);

    const value = {
      userName: data.userName,
      email: data.email,
      steps: data.steps,
      lastMiddleware: "emailSender",
      emailSender: true,
    };

    req.body.value = value;
    responseHandler(
      res,
      { data },
      200,
      ResponseMessages.RES_MSG_USER_CREATED_SUCCESSFULLY_EN,
    );

    next();
  } catch (error) {
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
