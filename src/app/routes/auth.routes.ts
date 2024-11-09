import { Router } from "express";
import {
  registerOne,
  registerTwo,
  verifyOTP,
} from "../controllers/signup.controller";
import {
  userStepsOne,
  userStepTwo,
} from "../middleware/validators/latest.validator";
import { emailSender } from "../middleware/email.sender";
import { verifyToken } from "../middleware/auth.middleware";

const router = Router();

router.route("/register-steps-1").post(userStepsOne, registerOne, emailSender);
router.route("/verfiy-otp").post(verifyOTP);
router.route("/register-steps-2").post(verifyToken, userStepTwo, registerTwo);
export default router;
