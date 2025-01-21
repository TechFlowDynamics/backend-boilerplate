import { Router } from 'express';
import { createRoom, getPublicRooms, joinRoom } from '../controllers/room.controller';
import { verifyToken } from '../middleware/auth.middleware';
import { createRoomValidate, joinRoomValidate } from '../middleware/validators/latest.validator';

const router = Router();

router.route('/createroom').post(createRoomValidate,verifyToken, createRoom);


router.route('/joinroom').post(joinRoomValidate,verifyToken, joinRoom);

router.get('/getPublicRooms',verifyToken, getPublicRooms);
// verifyToken,
// verifyToken,
export default router;