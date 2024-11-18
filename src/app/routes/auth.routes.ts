import { Router } from "express";
import {
  login,
  registerOne,
  registerTwo,
  verifyOTP,
} from "../controllers/signup.controller";
import {
  userStepsOne,
  userStepTwo,
  loginValidate,
} from "../middleware/validators/latest.validator";
import { emailSender } from "../middleware/email.sender";
import { verifyToken } from "../middleware/auth.middleware";
import { generateS3UploadUrlMiddleware } from "../middleware/mediaUpload.middleware";

const router = Router();

router.route("/register-steps-1").post(userStepsOne, registerOne, emailSender);
router.route("/verfiy-otp").post(verifyOTP);
router
  .route("/register-steps-2")
  .post(verifyToken, userStepTwo, generateS3UploadUrlMiddleware, registerTwo);

router.route("/login").post(loginValidate, login);

export default router;
