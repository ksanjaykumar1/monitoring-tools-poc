// Import necessary packages
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import moment from 'moment';


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
morgan.token('date', () => moment().format('YYYY-MM-DD HH:mm:ss'));  // Format like '2024-11-06 12:34:56'

// Set up morgan for logging HTTP requests with custom format
app.use(
    morgan(
      ':date :ip :method :url :status :response-time ms - :res[content-length] :body - :req[content-length]'
    )
  );

// Define a basic route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Define a basic route
app.post('/test', (req, res) => {
  res.send('Request received');
});

// Environment variables for port and host
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
