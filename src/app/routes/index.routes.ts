// routes.js

import express, { NextFunction, Request, Response } from "express";
import authRouter from "./auth.routes";
import { ResponseMessages } from "../../core/constants/cloud.constants";
// import { NotFound } from "../middleware/errors";
import { errorHandler } from "../middleware/errors/errorHandler.middleware";
const router = express.Router();

router.use("/auth", authRouter);

router.get(
  "/hello-world",
  async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({ data: "Hello from backend" });
  }
);

// router.use((req: Request, res: Response, next: NextFunction) => {
//   next(
//     new NotFound(
//       `${ResponseMessages.RES_MSG_NOT_FOUND_URL_EN}: ${req.originalUrl}`
//     )
//   );
// });

// router.use(errorHandler);

export default router;
