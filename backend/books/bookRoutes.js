import express from 'express';
import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from './bookController.js';

const router = express.Router();

// Route to get all books
router.get('/', getAllBooks);

// Route to get a specific book by ID
router.get('/:id', getBookById);

// Route to create a new book
router.post('/', createBook);

// Route to update an existing book by ID
router.put('/:id', updateBook);

// Route to delete a book by ID
router.delete('/:id', deleteBook);

export { router as bookRoutes };
