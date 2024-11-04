import mongoose from "mongoose";
import {
  CheckUserInterface,
  IncommingUserBody,
  OutGoingUserBody,
  UserIncomingDetails,
  UserSignupOutput,
} from "../../core/interface/auth.interface";
import { userModel } from "../models/index";
import dal from "./index";

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
  filter: UserIncomingDetails
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
