// Import necessary packages
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import moment from 'moment';

// Import the bookRoutes to handle all routes related to books (CRUD operations)
import { bookRoutes } from './books/bookRoutes.js';
// Import the errorHandler middleware to manage errors globally in the application
import { errorHandler } from './middlewares/errorHandler.js';
// Import the notFoundHandler middleware
import { notFoundHandler } from './middlewares/notFoundHandler.js';

// Initialize environment variables
dotenv.config();

// Create an Express application
const app = express();

// Middleware setup
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Custom morgan tokens for logging IP and request body
morgan.token('body', (req) => JSON.stringify(req.body));
morgan.token('ip', (req) => req.ip);
morgan.token('date', () => moment().format('YYYY-MM-DD HH:mm:ss')); // Format like '2024-11-06 12:34:56'

// Set up morgan for logging HTTP requests with custom format
app.use(
  morgan(
    ':date :ip :method :url :status :response-time ms - :res[content-length] :body - :req[content-length]'
  )
);

// Middleware
app.use((req, res, next) => {
  // console.log("Request Headers:", JSON.stringify(req.headers, null, 2));
  next();
});

// Define a basic route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Register the bookRoutes for all routes starting with '/api/books'
app.use('/api/v1/books', bookRoutes);

// Use the errorHandler middleware to catch and handle any errors globally
app.use(errorHandler);

// Use the notFoundHandler to catch any routes not defined and return a 404 error
app.use(notFoundHandler);

// Environment variables for port and host
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
