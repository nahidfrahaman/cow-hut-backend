import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { CowRoutes } from '../modules/cow/cow.route';
import { OrdersRoutes } from '../modules/orders/orders.route';
import { UserRoutes } from '../modules/user/user.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth/',
    route: AuthRoutes,
  },
  {
    path: '/users/',
    route: UserRoutes,
  },
  {
    path: '/cows/',
    route: CowRoutes,
  },
  {
    path: '/orders/',
    route: OrdersRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
