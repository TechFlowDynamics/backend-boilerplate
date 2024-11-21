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
  verifyOtpValidation,
} from "../middleware/validators/latest.validator";
import { emailSender } from "../middleware/email.sender";
import { isVerifiedUser, verifyToken } from "../middleware/auth.middleware";

const router = Router();

router.route("/register-steps-1").post(userStepsOne, registerOne, emailSender);
router.route("/verfiy-otp").post(verifyOtpValidation, verifyOTP);
router
  .route("/register-steps-2")
  .post(verifyToken, isVerifiedUser, userStepTwo, registerTwo);

router.route("/login").post(loginValidate, login);

export default router;
