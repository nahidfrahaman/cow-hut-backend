import express from 'express';
import { AuthController } from './auth.controller';

const router = express.Router();

router.post('/signUp', AuthController.createUser);

export const AuthRoutes = router;
