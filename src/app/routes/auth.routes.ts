import { Router } from "express";
import { registerOne } from "../controllers/signup.controller";
import { userStepsOne } from "../middleware/validators/latest.validator";
import { emailSender } from "../middleware/email.sender";

const router = Router();

router.route("/register-steps-1").post(userStepsOne, registerOne, emailSender);

export default router;
