import { Router } from "express";
const router = Router();

import multer from "multer";
const upload = multer();

router.route("/").post(upload.single("fields"));

export default router;
