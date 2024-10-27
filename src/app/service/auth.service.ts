
import {
  checkUser,
  upsertUser,
} from "../../data/dal/user.dal";
import { CustomError } from "../../core/handlers/error.handlers";
import { ResponseMessages } from "../../core/constants/cloud.constants";
import {
  generateHash,
} from "../../core/utils/util";

import { Purpose } from "../../core/enum/auth.enum";


export const signupService = async (data: any) => {
  const { phoneNumber, password } = data;

  // check if phoneNumber already exists
  const isUserExist = await checkUser({
    phoneNumber: phoneNumber,
    phoneVerified: true,
  });
  if (isUserExist) {
    throw new CustomError(
      "User Already Exist",
      ResponseMessages.RES_MSG_USER_EMAIL_ALREADY_EXISTS_EN,
    );
  }
  data.password = await generateHash(password);
  const create = await upsertUser({ phoneNumber: phoneNumber }, data);

  const response: any = {
    data: {
      userId: create.userId,
      userName: create.userName,
      phoneNumber: create.phoneNumber,
      purpose: Purpose.SIGNUP,
      countryCode: create.countryCode,
    },
  };

  return response;
};

