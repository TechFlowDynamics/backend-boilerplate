import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { MongoServerError } from "mongodb";

import { HttpStatusCodes } from "../constants/cloud.constants";

interface CustomErrorInterface {
  msg: string;
  statusCode: number;
}
interface CustomErrorOutputInterface extends CustomErrorInterface {
  mongooseError: boolean;
}

const errorHandlerMiddleware = (
  err: any,
  res: Response,
): CustomErrorOutputInterface => {
  let mongooseError = false;
  const customError: CustomErrorInterface = {
    msg: "Something went wrong, please try again",
    statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
  };

  if (err instanceof mongoose.Error.ValidationError) {
    mongooseError = true;
    if (err.name === "ValidationError") {
      customError.msg = Object.values(err.errors)
        .map(item => (item as mongoose.Error.ValidatorError).message)
        .join(",");
      customError.statusCode = HttpStatusCodes.BAD_REQUEST;
    }
  }
  if (err instanceof MongoServerError) {
    mongooseError = true;
    if (err.code && String(err.code) === "11000") {
      customError.msg = `This ${Object.keys(
        err.keyValue,
      )} already taken, please choose another`;
      customError.statusCode = HttpStatusCodes.BAD_REQUEST;
    }
  }
  if (err instanceof mongoose.Error.CastError) {
    mongooseError = true;
    customError.msg = `No match found with id of ${err.value}`;
    customError.statusCode = HttpStatusCodes.NOT_FOUND;
  }
  return {
    msg: customError.msg,
    mongooseError,
    statusCode: customError.statusCode,
  };
};

export default errorHandlerMiddleware;
