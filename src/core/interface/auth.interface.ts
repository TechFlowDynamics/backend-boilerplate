import mongoose, { Types } from "mongoose";

export interface CheckUserInterface {
  $or?: Array<object>;
  userName?: string;
  email?: string;
}

export interface IncommingUserBody extends CheckUserInterface {
  password: string;
  steps: number;
}

export interface OutGoingUserBody {
  userName: string;
  userId: Types.ObjectId;
  steps: number;
  email: string;
  purpose?: string;
}

export interface UserIncomingDetails {
  $or?: Array<object>;
  _id?: mongoose.Types.ObjectId | string | undefined;
  userId?: mongoose.Types.ObjectId;
  phoneNumber?: string;
  email?: string;
  userName?: string;
  phoneVerified?: boolean;
  emailVerified?: boolean;
}

export interface UserSignupOutput {
  data: {
    userName?: string;
    phoneNumber?: string;
    email?: string;
    userId?: mongoose.Types.ObjectId;
    countryCode?: string;
    purpose?: string;
    hash?: string;
    sendOTP?: boolean;
    phoneVerified?: boolean;
  };
}

export interface OtpDataInterface {
  $or?: Array<object>;
  phoneNumber?: string;
  countryCode?: string;
  purpose: string;
  email: string;
  userName?: string;
}

export interface OtpDataOutputInterface extends OtpDataInterface {
  hash?: string;
  code?: string;
  resendFlag?: boolean;
}

export interface OtpFilterInterface {
  $or?: Array<object>;
  phoneNumber?: string;
  purpose?: string;
  email?: string;
  flag?: string;
  hash?: string;
  code?: string;
}

export interface OutputOTPInterface extends OtpFilterInterface {
  userId?: string;
  countryCode: string;
  hash: string;
  email: string;
  phoneNumber?: string;
}

export interface OtpFilterInterface {
  phoneNumber?: string;
  purpose?: string;
  email?: string;
  flag?: string;
  hash?: string;
  code?: string;
}

export interface OutputOTPInterface extends OtpFilterInterface {
  userId?: string;
  countryCode: string;
  hash: string;
}

export interface UserLoginOutputInterface extends UserSignupOutput {
  refreshToken?: string;
  accessToken?: string;
}

// Refresh Token
export interface RefreshTokenInterface {
  userId?: string;
  refreshToken?: string;
  device?: object;
  hash?: string;
}

export interface UpdateUserInterface {
  password?: string;
  email?: string;
  isCompleted?: boolean;
  fullName?: string;
  firstName?: string;
  steps?: number;
  lastName?: string;
  emergencyContactNumber?: string;
  phoneVerified?: boolean;
  emailVerified?: boolean;
}

export interface UserOuput {
  userId?: mongoose.Types.ObjectId;
  phoneNumber?: string;
  userName: string;
  emergencyContactNumber?: string;
  email?: string;
  steps?: number;
  fullName?: string;
  countryCode: string;
  isCompleted?: boolean;
  phoneVerified?: boolean;
  emailVerified?: boolean;
}
