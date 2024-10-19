import { Router } from "express";
import { getList } from "../controllers/questions.controller";
const router = Router();

router.route("/get").get(getList);
export default router;
