import { Response, Request, NextFunction } from "express";
import { ResponseMessages } from "../../core/constants/cloud.constants";
import {
  CustomError,
  getErrorCode,
  getErrorMessage,
} from "../../core/handlers/error.handlers";
import { decodeUserToken, generateAccessToken } from "../../core/utils/util";
import { responseHandler } from "../../core/handlers/response.handlers";
import { getUser } from "../../data/dal/user.dal";
import mongoose from "mongoose";

export const createAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token: string | undefined = req
      .header("refresh-token")
      ?.replace("Bearer", "");
    if (!token) {
      throw new CustomError(
        "Invalid token !!",
        ResponseMessages.RES_MSG_INVALID_TOKEN_EN,
      );
    }
    const decodeUser = decodeUserToken(token);
    if (!decodeUser) {
      responseHandler(
        res,
        null,
        201,
        ResponseMessages.RES_MSG_INVALID_TOKEN_EN,
      );
    }
    const data = await getUser({
      _id: decodeUser.userId as mongoose.Types.ObjectId,
    });
    const accessToken = generateAccessToken(data.data);
    const response: any = {
      data: {
        phoneNumber: data.data.phoneNumber as string,
        userName: data.data.userName as string,
      },
      accessToken: accessToken,
    };
    responseHandler(
      res,
      response,
      200,
      ResponseMessages.ACCESS_TOKEN_CREATED_SUCCESSFULLY_EN,
    );
  } catch (error) {
    const code = getErrorCode(error) as number;
    const message = getErrorMessage(error);
    return responseHandler(res, null, code, message);
  }
};
