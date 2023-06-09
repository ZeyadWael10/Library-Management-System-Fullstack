import { Router } from 'express';
import { auth } from '../../Middlewares/Authentication.js';
import { myMulter, validObject } from '../../Services/Multer.js';
import { asyncHandler } from '../../Utils/ErrorHandling.js';
import * as BookController from './Book.controller.js';
import * as validators from './Book.validation.js';
import { ValidationFunction } from '../../Middlewares/Validation.js';
const router = Router();
router.get('/', BookController.getAllBooks);
router.get('/id/:_id', BookController.getBookById);
router.post(
    '/addbook',
    ValidationFunction(validators.addBookValidatinon),
    asyncHandler(BookController.addBook)
);
router.post(
    '/updatebook/:BookId',
    ValidationFunction(validators.updateBookValidatinon),
    asyncHandler(BookController.updateBook)
);
router.delete(
    '/deletebook/:BookId',
    ValidationFunction(validators.deleteBookValidatinon),
    asyncHandler(BookController.deleteBook)
);
router.put(
    '/borrowbook/:bookId',
    auth(),
    ValidationFunction(validators.borrowBookValidatinon),
    asyncHandler(BookController.borrowBook)
);
router.put(
    '/returnbook/:bookId',
    auth(),
    ValidationFunction(validators.returnBookValidatinon),
    asyncHandler(BookController.returnBook)
);

router.patch(
    '/addBookPics/:BookId',
    myMulter({ validation: validObject }).array('image'),
    asyncHandler(BookController.uploadBookPicture)
);
export default router;
