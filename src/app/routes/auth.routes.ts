import { Router } from "express";
import { registerOne, verifyOTP } from "../controllers/signup.controller";
import { userStepsOne } from "../middleware/validators/latest.validator";
import { emailSender } from "../middleware/email.sender";

const router = Router();

router.route("/register-steps-1").post(userStepsOne, registerOne, emailSender);
router.route("/verfiy-otp").post(verifyOTP);
export default router;
