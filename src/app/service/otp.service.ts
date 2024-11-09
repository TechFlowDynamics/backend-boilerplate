import { checkOTP, createOTP } from "../../data/dal/otp.dal";
import {
  OtpDataInterface,
  OtpDataOutputInterface,
} from "../../core/interface/auth.interface";
import { CustomError } from "../../core/handlers/error.handlers";
import { ResponseMessages } from "../../core/constants/cloud.constants";

export const getOTP = async (
  data: OtpDataInterface,
): Promise<OtpDataOutputInterface> => {
  const isOTP = await checkOTP({
    $or: [
      {
        phoneNumber: data.phoneNumber,
        purpose: data.purpose,
      },
      {
        purpose: data.purpose,
        email: data.email,
      },
    ],
  });
  if (isOTP) {
    throw new CustomError("OTP Already Sent ", ResponseMessages.BAD_REQUEST);
  }
  const otpData = await createOTP(data);
  const result: OtpDataOutputInterface = {
    countryCode: otpData?.countryCode,
    email: data.email,
    code: otpData.code,
    purpose: data.purpose,
    userName: data.userName,
    phoneNumber: data?.phoneNumber,
  };
  return result;
};

export default {
  getOTP,
};
