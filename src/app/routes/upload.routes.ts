import { Router } from "express";
import multer from "multer";
import { uploadFile } from "../controllers/upload.controller";

const router = Router();
const upload = multer();

router.route("/").post(upload.single("files"), uploadFile);

export default router;
