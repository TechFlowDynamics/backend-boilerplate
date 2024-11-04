import {
  checkUser,
  createUser,
  // upsertUser,
} from "../../data/dal/user.dal";
import { CustomError } from "../../core/handlers/error.handlers";
import { ResponseMessages } from "../../core/constants/cloud.constants";
import { generateHash } from "../../core/utils/util";

import { Purpose } from "../../core/enum/auth.enum";
import {
  IncommingUserBody,
  OutGoingUserBody,
} from "../../core/interface/auth.interface";

export const signupServiceOne = async (
  data: IncommingUserBody,
): Promise<OutGoingUserBody> => {
  // check if username already exists
  const isUserExist = await checkUser({
    userName: data.userName,
    email: data.email,
  });
  // if (isUserExist) {
  //   throw new CustomError(
  //     "User Already Exist",
  //     ResponseMessages.RES_MSG_USER_EMAIL_ALREADY_EXISTS_EN,
  //   );
  // }
  data.password = await generateHash(data.password);
  data.steps = 1;
  const create = await createUser(data);

  const response: OutGoingUserBody = {
    userId: create.userId,
    userName: create.userName,
    purpose: Purpose.SIGNUP,
    steps: 1,
    email: create.email,
  };

  return response;
};
