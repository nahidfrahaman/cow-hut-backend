import express from 'express';
import { ENUM_USER_ROLLE } from '../../../enum/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validRequest';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';
const router = express.Router();

router.patch(
  '/my-profile',
  auth(ENUM_USER_ROLLE.ADMIN, ENUM_USER_ROLLE.BUYER, ENUM_USER_ROLLE.SELLER),
  UserController.updatemyProfile
);

router.get(
  '/myProfile',
  auth(ENUM_USER_ROLLE.ADMIN, ENUM_USER_ROLLE.BUYER, ENUM_USER_ROLLE.SELLER),
  UserController.getmyProfile
);

router.get('/:id', auth(ENUM_USER_ROLLE.ADMIN), UserController.getSingleUser);
router.patch(
  '/:id',
  validateRequest(UserValidation.updateUserZodSchema),
  auth(ENUM_USER_ROLLE.ADMIN),
  UserController.updateUser
);
router.delete('/:id', auth(ENUM_USER_ROLLE.ADMIN), UserController.userDelete);
router.get('/', auth(ENUM_USER_ROLLE.ADMIN), UserController.getAllUser);

export const UserRoutes = router;
