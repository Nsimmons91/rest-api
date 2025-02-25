import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import books from './books.js';
import pretty from 'express-prettify';
import  getBooks from './db.js';

const app = express();
const PORT = 5000;

// to let the server know what directory we are working on
const __dirname = path.resolve();

// Configuring cors middleware
app.use(cors());

// Configuring express-prettify middleware for working with JSON
app.use(pretty({ query: 'pretty' }));

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// to render static files from the client folder
app.use(express.static('client'));

// READ all books
app.get('/api/books', getBooks)

// READ a specific book by ID
app.get('/api/books/:bookID', cors(), (req, res) => {
  const requestedBookID = parseInt(req.params.bookID);
  const book = books.find(b => b.id === requestedBookID);
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

// CREATE a new book
app.post('/api/books', (req, res) => {
  const newBook = req.body;
  newBook.id = books.length ? books[books.length - 1].id + 1 : 1; // Assign a new ID
  books.push(newBook);
  res.status(201).json(newBook);
});

// UPDATE a book by ID
app.put('/api/books/:bookID', (req, res) => {
  const bookID = parseInt(req.params.bookID);
  const bookIndex = books.findIndex(book => book.id === bookID);

  if (bookIndex !== -1) {
    const updatedBook = { ...books[bookIndex], ...req.body };
    books[bookIndex] = updatedBook;
    res.json(updatedBook);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

// DELETE a book by ID
app.delete('/api/books/:bookID', (req, res) => {
  const bookID = parseInt(req.params.bookID);
  const bookIndex = books.findIndex(book => book.id === bookID);

  if (bookIndex !== -1) {
    books.splice(bookIndex, 1);
    res.status(204).end();
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

// creates a route `/` that is the homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

app.listen(PORT, () => console.log(`Hola! Server running on Port http://localhost:${PORT}`));