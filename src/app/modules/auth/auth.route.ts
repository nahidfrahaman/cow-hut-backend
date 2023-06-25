import express from 'express';
import validateRequest from '../../middlewares/validRequest';
import { UserValidation } from '../user/user.validation';
import { AuthController } from './auth.controller';

const router = express.Router();

router.post(
  '/sign-up',
  validateRequest(UserValidation.createUserZodSchema),
  AuthController.createUser
);
router.post('/login', AuthController.login);
router.post('/refresh-token', AuthController.refreshToken);

export const AuthRoutes = router;
