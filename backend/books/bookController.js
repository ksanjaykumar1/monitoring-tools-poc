// Dummy data for books
const dummyBooks = [
  { id: '1', title: 'Book 1', author: 'Author 1' },
  { id: '2', title: 'Book 2', author: 'Author 2' },
  { id: '3', title: 'Book 3', author: 'Author 3' },
];

// Controller to get all books
export const getAllBooks = (req, res) => {
  res.status(200).json(dummyBooks); // Return dummy books data
};

// Controller to get a specific book by ID
export const getBookById = (req, res) => {
  const book = dummyBooks.find((b) => b.id === req.params.id);
  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }
  res.status(200).json(book); // Return the found book
};

// Controller to create a new book
export const createBook = (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ message: 'Title and author are required' });
  }

  const newBook = {
    id: (dummyBooks.length + 1).toString(),
    title,
    author,
  };
  dummyBooks.push(newBook); // Add new book to the dummy data
  res.status(201).json(newBook); // Return the created book
};

// Controller to update an existing book
export const updateBook = (req, res) => {
  const { title, author } = req.body;
  const book = dummyBooks.find((b) => b.id === req.params.id);
  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }

  book.title = title || book.title;
  book.author = author || book.author;

  res.status(200).json(book); // Return the updated book
};

// Controller to delete a book
export const deleteBook = (req, res) => {
  const index = dummyBooks.findIndex((b) => b.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Book not found' });
  }

  dummyBooks.splice(index, 1); // Remove the book from the dummy data
  res.status(204).send(); // No content response after deletion
};
