import mongoose from "mongoose";
import {
  CheckUserInterface,
  IncommingUserBody,
  LoginUserOuputInterface,
  OutGoingUserBody,
  UpdateUserInterface,
  UserIncomingDetails,
  UserOuput,
  UserSignupOutput,
} from "../../core/interface/auth.interface";
import { userModel } from "../models/index";
import dal from "./index";
import { CustomError } from "../../core/handlers/error.handlers";
import { ResponseMessages } from "../../core/constants/cloud.constants";
import { IUser } from "src/core/interface/user.interface";

export const createUser = async (
  body: IncommingUserBody
): Promise<OutGoingUserBody> => {
  try {
    const data = await dal.create(userModel, body);
    const response: OutGoingUserBody = {
      userId: data._id as mongoose.Types.ObjectId,
      userName: data.userName as string,
      steps: data.steps as number,
      email: data.email as string,
    };
    return response;
  } catch (error) {
    console.log("🚀 ~ error:", error);
    throw error;
  }
};

export const checkUser = async (
  filter: CheckUserInterface
): Promise<boolean> => {
  const data = await dal.findOne(userModel, filter);
  if (!data) {
    return false;
  }
  return true;
};

export const getUser = async (
  filter: CheckUserInterface
): Promise<UserSignupOutput> => {
  const data = await dal.findOne(userModel, filter);
  const response: UserSignupOutput = {
    data: {
      userName: data?.userName as string,
      phoneNumber: data?.phoneNumber as string,
      userId: data?._id as mongoose.Types.ObjectId,
    },
  };
  return response;
};
export const getSingleUser = async (
  filter: CheckUserInterface
): Promise<IUser | null> => {
  const data = await dal.findOne(userModel, filter);
  if (!data) return null;
  return data;
};
export const updateUser = async (
  filter: CheckUserInterface,
  body: UpdateUserInterface
): Promise<IUser> => {
  const data = await userModel.findOneAndUpdate(
    filter,
    { ...body },
    {
      new: true,
      useFindAndModify: false,
    }
  );
  if (!data) {
    throw new CustomError(
      "User Not found",
      ResponseMessages.RES_MSG_USER_NOT_FOUND_EN
    );
  }
  return data;
};

export const findUser = async (filter: CheckUserInterface): Promise<IUser> => {
  const data = await userModel.findOne({ ...filter });
  if (!data) {
    throw new CustomError(
      "User Not present, Please register",
      ResponseMessages.RES_MSG_USER_NOT_FOUND_EN
    );
  }
  return data;
};

export const upsertUser = async (
  filter: CheckUserInterface,
  body: UpdateUserInterface
): Promise<IUser> => {
  const data = await dal.findOneAndUpsert(userModel, filter, { ...body });
  if (!data) {
    throw new CustomError(
      "User Not found",
      ResponseMessages.RES_MSG_USER_NOT_FOUND_EN
    );
  }

  return data;
};
