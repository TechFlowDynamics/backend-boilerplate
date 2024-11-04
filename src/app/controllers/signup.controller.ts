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
// import { NotFound } from "../middleware/errors";

export const registerOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body as any;
    const data = await signupServiceOne(body);

    return responseHandler(
      res,
      {data}  ,
      // null,
      200,
      ResponseMessages.RES_MSG_USER_CREATED_SUCCESSFULLY_EN
    );

    // next();
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
