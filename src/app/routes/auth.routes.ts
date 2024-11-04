import { Router } from "express";
import { registerOne } from "../controllers/signup.controller";
import { userStepsOne } from "../middleware/validators/latest.validator";

const router = Router();

router.route("/register-steps-1").post(userStepsOne, registerOne);

export default router;
