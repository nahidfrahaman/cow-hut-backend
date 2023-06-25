import express from 'express';
import validateRequest from '../../middlewares/validRequest';
import { AdminController } from './admin.controller';
import { AdminValidation } from './admin.validation';

const router = express.Router();

router.post(
  '/createAdmin',
  validateRequest(AdminValidation.createAdminZodSchema),
  AdminController.createAdmin
);
router.post('/login', AdminController.login);
router.post('/refreshToken', AdminController.refreshToken);

export const AdminRoutes = router;
