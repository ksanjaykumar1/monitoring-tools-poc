// Middleware to handle requests to undefined routes (404 Not Found)
export const notFoundHandler = (req, res, next) => {
  res.status(404).json({ message: 'Route not found' }); // Respond with a 404 error and a message
};
