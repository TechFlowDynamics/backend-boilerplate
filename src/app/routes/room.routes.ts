import { Router } from "express";
import {

  createRoom,
  getPublicRooms,
  joinRoom,
  verifyUserInRoom,
} from "../controllers/room.controller";
import { verifyToken } from "../middleware/auth.middleware";
import {
  createRoomValidate,
  joinRoomValidate,
} from "../middleware/validators/latest.validator";

const router = Router();

router.route("/createroom").post(verifyToken, createRoomValidate, createRoom);

router.route("/joinroom").post(verifyToken, joinRoomValidate, joinRoom);

router.get("/getPublicRooms", verifyToken, getPublicRooms);
router.get("/:roomCode/verify", verifyToken, verifyUserInRoom);




export default router;
