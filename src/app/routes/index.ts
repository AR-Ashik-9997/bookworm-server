import express from 'express';
import { UserRoutes } from '../modules/users/user.route';
import { CowRoutes } from '../modules/cows/cow.route';
import { AuthRoute } from '../modules/auth/auth.route';
import { OrderRoutes } from '../modules/orders/order.route';
import { AdminRoutes } from '../modules/Admin/admin.routes';
import { BookRoutes } from '../modules/books/book.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoute,
  },  
  {
    path: '/ books',
    route: BookRoutes,
  },  
];
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
