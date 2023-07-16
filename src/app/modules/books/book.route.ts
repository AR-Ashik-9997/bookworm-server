import express from 'express';
import requestValidation from '../../../middleware/requestValidation';
import { BookController } from './book.controller';
import { BookValidation } from './book.validation';
const router = express.Router();
router.post(
  '/',
  requestValidation(BookValidation.createBookzodValidationSchema),
  BookController.createBook
);
router.get('/', BookController.getAllBooks);
router.get('/:id', BookController.getSingleBook);
router.patch(
  '/:id',
  requestValidation(BookValidation.UpdateBookzodValidationSchema),
  BookController.updateBook
);
router.delete('/:id', BookController.deleteBook);

export const BookRoutes = router;
