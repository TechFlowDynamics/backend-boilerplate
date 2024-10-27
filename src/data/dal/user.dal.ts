

import { userModel } from "../models/index";
export const createUser = async (
  body: any,
): Promise<any> => {
  const data = await userModel.create(body);
  const response: any = {
    userId: data._id,
    phoneNumber: data.phoneNumber as string,
    userName: data.userName as string,
    countryCode: data.countryCode as string,
  };
  return response;
};

