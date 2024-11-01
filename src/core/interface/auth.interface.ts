import mongoose, { Types } from "mongoose";

export interface CheckUserInterface {
  userName: string;
  email: string;
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
  userName?: string;
  phoneVerified?: boolean;
  emailVerified?: boolean;
}

export interface UserSignupOutput {
  data: {
    userName?: string;
    phoneNumber: string;
    userId?: mongoose.Types.ObjectId;
    countryCode?: string;
    purpose?: string;
    hash?: string;
    sendOTP?: boolean;
    phoneVerified?: boolean;
  };
}
