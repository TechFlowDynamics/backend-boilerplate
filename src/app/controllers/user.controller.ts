import { Response, Request, NextFunction } from "express";
import { ResponseMessages } from "../../core/constants/cloud.constants";
import userService from "../service/user.service";
import { responseHandler } from "../../core/handlers/response.handlers";
import { CustomError } from "../../core/handlers/error.handlers";

export const checkUserName = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body = req.value;
    const isUserExist = await userService.checkUserName({
      userName: body?.userName,
    });
    if (isUserExist) {
      responseHandler(res, null, 200, "User Exist with this username!!");
    }
    throw new CustomError(ResponseMessages.OK, "200");
  } catch (error) {
    next(error);
  }
};
export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body = req.userData;
    const isUserExist = await userService.getUser({
      _id: body?.userId,
    });
    if (!isUserExist) {
      throw new CustomError(ResponseMessages.OK, "200");
    }
    responseHandler(res, isUserExist, 200, "User Exist fetched successfully!!");
  } catch (error) {
    next(error);
  }
};
