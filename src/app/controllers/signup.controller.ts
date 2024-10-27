import { Response, Request, NextFunction } from "express";
import {
  signupService,
} from "../service/auth.service";
import { responseHandler } from "../../core/handlers/response.handlers";
import {
  getErrorCode,
  getErrorMessage,
} from "../../core/handlers/error.handlers";

import { ResponseMessages } from "../../core/constants/cloud.constants";
import errorHandlerMiddleware from "../../core/handlers/mongooseError.handler";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = req.body;
    const userData = await signupService(data);
    

    const value = {
      countryCode: userData.data.countryCode,
      phoneNumber: data.phoneNumber,
     
      lastMiddleware: "phoneSender",
      phoneSender: true,
    };

    req.body.value = value;
    responseHandler(
      res,
      userData,
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

