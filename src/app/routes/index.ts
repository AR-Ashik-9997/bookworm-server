import express from 'express';
import { AuthRoute } from '../modules/auth/auth.route';
import { BookRoutes } from '../modules/books/book.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoute,
  },
  {
    path: '/books',
    route: BookRoutes,
  },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
