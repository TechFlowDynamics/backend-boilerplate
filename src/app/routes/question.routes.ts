import { Router } from "express";
import { getList, getQuestions } from "../controllers/questions.controller";
const router = Router();

router.route("/get").get(getList);
router.route("/get/:slug").get(getQuestions);
export default router;
