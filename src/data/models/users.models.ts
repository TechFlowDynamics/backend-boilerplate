import mongoose from "mongoose";

// Define Mongoose Schema
const userSchema = new mongoose.Schema(
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
    email: {
      type: String,
      index: true,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    phoneNumber: {
      type: String,
      unique: true,
    },
    phoneVerified: {
      type: Boolean,
      default: false,
    },
    steps: {
      type: Number,
    },
    countryCode: {
      type: String,
    },
    active: {
      type: Boolean,
      default: false,
      required: true,
    },
    emergencyContactNumber: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

// Define Mongoose Model
const userModel = mongoose.model("users", userSchema);
export default userModel;
