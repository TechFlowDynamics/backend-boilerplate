import { Router } from "express";
import {
 
  register,
 
} from "../controllers/signup.controller";
import {
  userSignup,

} from "../middleware/validators/auth.validate";

const router = Router();

router.route("/register").post(userSignup, register);


export default router;
