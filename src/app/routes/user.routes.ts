import { Router } from "express";
import { getUser, checkUserName } from "../controllers/user.controller";
import { getUserValidation } from "../middleware/validators/user/user.validator";
import { isVerifiedUser, verifyToken } from "../middleware/auth.middleware";

const router = Router();

router.route("/username").get(getUserValidation, checkUserName);
router.route("/").get(verifyToken, isVerifiedUser, getUser);

export default router;
