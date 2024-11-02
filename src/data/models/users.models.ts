import mongoose from "mongoose";
import { IUser } from "../../core/interface/user.interface";

// Define Mongoose Schema
const userSchema = new mongoose.Schema<IUser>(
  {
    fullName: {
      type: String,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    userName: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    phoneNumber: {
      type: String,
      unique: true,
    },
    phoneVerified: {
      type: Boolean,
      default: false,
    },
    countryCode: {
      type: String,
    },
    email: {
      type: String,
      index: true,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    steps: {
      type: Number,
    },

    active: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// Define Mongoose Model
const userModel = mongoose.model("users", userSchema);
export default userModel;
