import express from 'express';
import { OrdersController } from './orders.controller';

const router = express.Router();

router.post('/', OrdersController.postOrders);

router.get('/', OrdersController.getAllOrders);

export const OrdersRoutes = router;
