import { checkUser, createUser, updateUser } from "../../data/dal/user.dal";
import { CustomError } from "../../core/handlers/error.handlers";
import { ResponseMessages } from "../../core/constants/cloud.constants";
import {
  generateAccessToken,
  generateHash,
  generateRefreshToken,
} from "../../core/utils/util";

import { Purpose } from "../../core/enum/auth.enum";
import {
  IncommingUserBody,
  OtpFilterInterface,
  OutGoingUserBody,
  UserLoginOutputInterface,
} from "../../core/interface/auth.interface";
import { findOtp, verifyOTP } from "../../data/dal/otp.dal";
import { createRefresehToken } from "../../data/dal/token.dal";

export const signupServiceOne = async (
  data: IncommingUserBody,
): Promise<OutGoingUserBody> => {
  // check if username already exists
  const isUserExist = await checkUser({
    $or: [
      {
        userName: data.userName,
      },
      {
        email: data.email,
      },
    ],
  });
  if (isUserExist) {
    throw new CustomError(
      ResponseMessages.RES_MSG_USER_EMAIL_ALREADY_EXISTS_EN,
      "400",
    );
  }
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

export const otpVerify = async (
  data: OtpFilterInterface,
): Promise<UserLoginOutputInterface> => {
  if (data.purpose === Purpose.FORGET_PASSWORD) {
    const response = await findOtp(data);
    const send: UserLoginOutputInterface = {
      data: {
        email: response.email,
        hash: response.hash,
        purpose: data.purpose,
      },
    };
    return send;
  } else {
    const verifiedUser = await verifyOTP(data);
    const response = await updateUser(
      { email: verifiedUser.email },
      { phoneVerified: true },
    );

    const token = generateAccessToken(response);
    const refreshToken = generateRefreshToken(response);
    const hashRefresh = await generateHash(refreshToken);
    await createRefresehToken({
      userId: String(response.userId),
      refreshToken: refreshToken,
      hash: hashRefresh,
    });

    return {
      data: response,
      accessToken: token,
      refreshToken: refreshToken,
    } as UserLoginOutputInterface;
  }
};
