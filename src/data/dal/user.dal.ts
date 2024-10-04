

import { CheckUserInterface, IncommingUserBody, OutGoingUserBody } from "../../core/interface/auth.interface";
import { userModel } from "../models/index";
export const createUser = async (
  body: IncommingUserBody,
): Promise<OutGoingUserBody> => {
  const data = await userModel.create(body);
  const response: OutGoingUserBody = {
    userId: data._id,
    userName: data.userName as string,
    steps: data.steps as number,
    email:  data.email as string
  };
  return response;
};

export const checkUser=async(filter:CheckUserInterface):Promise <boolean>=>{
  const data = await userModel.findOne({ ...filter });
  if (!data) {
    return false;
  }
  return true;
}