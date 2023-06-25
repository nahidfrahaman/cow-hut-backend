import express from 'express';
import { ENUM_USER_ROLLE } from '../../../enum/user';
import auth from '../../middlewares/auth';
import { CowController } from './cow.controller';

const router = express.Router();

router.post(
  '/create-cow',
  auth(ENUM_USER_ROLLE.SELLER),
  CowController.createCow
);
router.get(
  '/:id',
  auth(ENUM_USER_ROLLE.ADMIN, ENUM_USER_ROLLE.BUYER, ENUM_USER_ROLLE.SELLER),
  CowController.getSingleCow
);
router.patch('/:id', auth(ENUM_USER_ROLLE.SELLER), CowController.updateCow);
router.delete('/:id', auth(ENUM_USER_ROLLE.SELLER), CowController.deleteCow);
router.get(
  '/',
  auth(ENUM_USER_ROLLE.ADMIN, ENUM_USER_ROLLE.BUYER, ENUM_USER_ROLLE.SELLER),
  CowController.getCows
);

export const CowRoutes = router;
