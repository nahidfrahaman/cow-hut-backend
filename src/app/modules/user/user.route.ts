import express from 'express';
import { UserController } from './user.controller';
const router = express.Router();

router.get('/:id', UserController.getSingleUser);
router.patch('/:id', UserController.updateUser);
router.delete('/:id', UserController.userDelete);
router.get('/', UserController.getAllUser);

export const UserRoutes = router;
