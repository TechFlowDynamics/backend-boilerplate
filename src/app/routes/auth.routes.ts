import { Router } from "express";
import {
 
  registerOne,
 
} from "../controllers/signup.controller";
import {
  userstepsOne,

} from "../middleware/validators/auth.validate";

const router = Router();

router.route("/register-steps-1").post(userstepsOne, registerOne);


export default router;
