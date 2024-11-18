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
    profilePhoto: {
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
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    phoneNumber: {
      type: String,
      sparse: true,
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
      required: true,
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
