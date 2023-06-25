import express from 'express';
import { ENUM_USER_ROLLE } from '../../../enum/user';
import auth from '../../middlewares/auth';
import { OrdersController } from './orders.controller';

const router = express.Router();

router.post('/post', auth(ENUM_USER_ROLLE.BUYER), OrdersController.postOrders);

router.get(
  '/:id',
  auth(ENUM_USER_ROLLE.ADMIN, ENUM_USER_ROLLE.BUYER, ENUM_USER_ROLLE.SELLER),
  OrdersController.getAllOrders
);

export const OrdersRoutes = router;
