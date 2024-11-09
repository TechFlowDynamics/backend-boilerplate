import mongoose from "mongoose";

const refreshTokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      index: true,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    hash: {
      type: String,
    },
    device: {
      type: {
        fcmToken: { type: String },
        deviceName: { type: String },
      },
    },
  },
  { timestamps: true },
);

refreshTokenSchema.index({ updatedAT: 1 }, { expireAfterSeconds: 2592000 });

const refreshTokenModel = mongoose.model("refreshtokens", refreshTokenSchema);
export default refreshTokenModel;
