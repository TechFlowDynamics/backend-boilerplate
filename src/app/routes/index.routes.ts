// routes.js

import express, { Request, Response } from "express";
import authRouter from "./auth.routes";
const router = express.Router();

router.use("/auth", authRouter);

router.get("/hello-world", async (req: Request, res: Response) => {
  res.status(200).json({ data: "Hello from backend" });
});

export default router;
