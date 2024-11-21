import mongoose from "mongoose";

export type UserType = {
  userId: mongoose.Types.ObjectId;
  phoneNumber?: string;
  email?: string;
  userName?: string;
  isCompleted?: boolean;
  phoneVerified?: boolean;
  emailVerified?: boolean;
};
