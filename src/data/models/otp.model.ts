import mongoose from "mongoose";
import { Purpose } from "../../core/enum/auth.enum";

// Define Mongoose Schema
const OTPSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
    },
    email: {
      type: String,
      index: true,
      sparse: true,
    },
    phoneNumber: {
      type: String,
      index: true,
      sparse: true,
    },
    countryCode: {
      type: String,
    },
    purpose: {
      type: String,
      enum: Object.values(Purpose),
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    hash: {
      type: String,
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
OTPSchema.index({ updatedAt: 1 }, { expireAfterSeconds: 300 });

const otpModel = mongoose.model("otps", OTPSchema);
export default otpModel;
