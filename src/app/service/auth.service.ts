import {
  checkUser,
  findUser,
  getSingleUser,
  updateUser,
  upsertUser,
} from "../../data/dal/user.dal";
import { CustomError } from "../../core/handlers/error.handlers";
import { ResponseMessages } from "../../core/constants/cloud.constants";
import {
  compareHash,
  generateAccessToken,
  generateHash,
  generateRefreshToken,
} from "../../core/utils/util";

import { Purpose } from "../../core/enum/auth.enum";
import {
  IncommingUserBody,
  IncommingUserStepTwo,
  LoginUserIncommingInterface,
  OtpFilterInterface,
  OutGoingUserBody,
  OutGoingUserStepTwo,
  UserLoginOutputInterface,
  UserOuput,
} from "../../core/interface/auth.interface";
import { findOtp, verifyOTP } from "../../data/dal/otp.dal";
import { createRefresehToken } from "../../data/dal/token.dal";
import mongoose from "mongoose";

export const signupServiceOne = async (
  data: IncommingUserBody
): Promise<OutGoingUserBody> => {
  const userData = await getSingleUser({
    email: data.email,
  });

  let userComeUp = false;

  if (userData) {
    userComeUp = true;
    if (userData.emailVerified) {
      throw new CustomError(
        ResponseMessages.RES_MSG_USER_EMAIL_ALREADY_EXISTS_EN,
        "400"
      );
    }
  }
  data.password = await generateHash(data.password);
  data.steps = 1;
  let email = data.email as string;
  delete data.email;
  const create = await upsertUser(
    {
      email: email,
    },
    data
  );

  const response: OutGoingUserBody = {
    userId: create._id as mongoose.Types.ObjectId,
    userName: create.userName,
    purpose: Purpose.SIGNUP,
    steps: 1,
    userComeUp: true,
    email: create.email as string,
  };

  return response;
};

export const checkUserName = async (
  data: IncommingUserBody
): Promise<Boolean> => {
  const isUserExist = await checkUser({ userName: data.userName });
  if (!isUserExist) return false;
  return true;
};

export const otpVerify = async (
  data: OtpFilterInterface
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
      { emailVerified: true }
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

export const signupServiceTwo = async (
  userId: mongoose.Types.ObjectId,
  body: IncommingUserStepTwo
): Promise<UserOuput> => {
  const isUserExist = await checkUser({
    _id: userId,
  });
  if (!isUserExist) {
    throw new CustomError(ResponseMessages.RES_MSG_USER_NOT_FOUND_EN, "400");
  }
  const data = await updateUser({ _id: userId }, body);

  const response: UserOuput = {
    steps: data.steps,
    userName: data.userName,
    profilePhoto: data.profilePhoto,
    isCompleted: data.isCompleted,
  };
  return response;
};

export const loginService = async (body: LoginUserIncommingInterface) => {
  const data = await findUser({ email: body.email as string });

  const isMatch = await compareHash(
    String(body.password),
    String(data.password)
  );
  if (!isMatch) {
    throw new CustomError(
      "Invalid Credentials ",
      ResponseMessages.RES_MSG_INVALID_PASSWORD
    );
  }
  const accessToken = generateAccessToken(data);
  const refreshToken = generateRefreshToken(data);
  const response = {
    data: {
      userId: data.userId,
      userName: data.userName,
    },
    accessToken: accessToken,
    refreshToken: refreshToken,
  };
  return response;
};
