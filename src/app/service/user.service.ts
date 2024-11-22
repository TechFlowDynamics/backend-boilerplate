import { CheckUserInterface } from "../../core/interface/auth.interface";
import { checkUser, getSingleUser } from "../../data/dal/user.dal";
import { IUser } from "../../core/interface/user.interface";
import { CustomError } from "../../core/handlers/error.handlers";
import { ResponseMessages } from "../../core/constants/cloud.constants";

export const checkUserName = async (
  data: CheckUserInterface,
): Promise<Boolean> => {
  const isUserExist = await checkUser({ userName: data.userName });
  if (!isUserExist) return false;
  return true;
};

export const getUser = async (filter: CheckUserInterface): Promise<IUser> => {
  const userData = await getSingleUser(filter);
  if (!userData)
    throw new CustomError(ResponseMessages.RES_MSG_USER_NOT_FOUND_EN, "400");
  return userData;
};

const defaultExports = { checkUserName, getUser };
export default defaultExports;
