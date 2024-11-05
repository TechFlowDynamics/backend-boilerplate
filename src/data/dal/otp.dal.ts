import { generateHash, generateOtpCode } from "../../core/utils/util";
import {
  OtpDataInterface,
  OtpDataOutputInterface,
  OtpFilterInterface,
  OutputOTPInterface,
} from "../../core/interface/auth.interface";
import { otpModel } from "../models/index";
import { CustomError } from "../../core/handlers/error.handlers";
import { ResponseMessages } from "../../core/constants/cloud.constants";

export const checkOTP = async (
  filter: OtpFilterInterface,
): Promise<boolean> => {
  const data = await otpModel.findOne({ ...filter });
  if (!data) {
    return false;
  }
  return true;
};

export const createOTP = async (
  body: OtpDataInterface,
): Promise<OtpDataOutputInterface> => {
  const otp: string = generateOtpCode();
  const hash = await generateHash(otp);
  const inputData: OtpDataOutputInterface = { ...body, code: otp, hash: hash };
  await otpModel.create(inputData);
  return inputData;
};

export const verifyOTP = async (
  filter: OtpFilterInterface,
): Promise<OutputOTPInterface> => {
  const data = await otpModel.findOneAndDelete({ ...filter });

  if (!data) {
    throw new CustomError(
      "Invalid OTP",
      ResponseMessages.RES_MSG_USER_OTP_WRONG_EN,
    );
  }

  return data as OutputOTPInterface;
};

export const findOtp = async (
  filter: OtpFilterInterface,
): Promise<OutputOTPInterface> => {
  const flag = filter?.flag || false;
  delete filter.flag;
  const data = await otpModel.findOne({ ...filter });
  if (!data) {
    const errorMessage =
      flag === "Create Password" ? "Invalid Creds" : "Invalid OTP";

    const errorType =
      flag === "Create Password"
        ? ResponseMessages.RES_MSG_INVALID_HASH_EN
        : ResponseMessages.RES_MSG_USER_OTP_WRONG_EN;

    throw new CustomError(errorMessage, errorType);
  }
  return data as OutputOTPInterface;
};

export const upsertOTP = async (
  filter: OtpDataInterface,
): Promise<OtpDataOutputInterface> => {
  const otp: string = generateOtpCode();
  const hash = await generateHash(otp);
  const data = await otpModel.findOneAndUpdate(
    filter,
    { code: otp, hash: hash },
    {
      new: true,
      upsert: true,
      runValidators: true,
      context: "query",
      setDefaultsOnInsert: true,
    },
  );
  const inputData: OtpDataOutputInterface = {
    ...filter,
    code: otp,
    countryCode: data.countryCode as string,
    hash: hash,
  };

  return inputData;
};

export default {
  checkOTP,
  createOTP,
  verifyOTP,
  findOtp,
  upsertOTP,
};
