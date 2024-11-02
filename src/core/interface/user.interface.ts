import { Document } from "mongoose";

// Define the interface for the User document
export interface IUser extends Document {
  fullName?: string;
  firstName?: string;
  lastName?: string;
  isCompleted?: boolean;
  userName: string;
  password: string;
  phoneNumber: string;
  phoneVerified?: boolean;
  countryCode?: string;
  email?: string;
  emailVerified?: boolean;
  steps?: number;
  active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
