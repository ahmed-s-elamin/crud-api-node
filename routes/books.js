const express = require("express");
const router = express.Router();
const Book = require("../models/book");

//creating a book
router.post("/new", async (req, res) => {
  const book = new Book({
    name: req.body.name,
    author: req.body.author,
    price: req.body.price,
    description: req.body.description,
    available: req.body.available,
    image: req.body.image,
  });

  try {
    const newbook = await book.save();
    res.status(201).json(newbook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// getting all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.send(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//getting one book
router.get("/:id", getBook, (req, res) => {
  res.json(res.book);
});

//updating a book
router.patch("/:id", getBook, async (req, res) => {
  if (req.body.name != null) {
    res.book.name = req.body.name;
  }
  if (req.body.author != null) {
    res.book.author = req.body.author;
  }
  if (req.body.description != null) {
    res.book.description = req.body.description;
  }
  if (req.body.price != null) {
    res.book.price = req.body.price;
  }
  if (req.body.available != null) {
    res.book.available = req.body.available;
  }
  if (req.body.image != null) {
    res.book.image = req.body.image;
  }
  try {
    const updatedBook = await res.book.save();
    res.json(updatedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//deleting a book
router.delete("/:id", getBook, async (req, res) => {
  try {
    res.book.remove();
    res.json({ message: "Successfully deleted" });
  } catch (err) {
    res.status(500).json({ messge: err.message });
  }
});

//middleware
async function getBook(req, res, next) {
  let book;
  try {
    book = await Book.findById(req.params.id);
    if (book == null) {
      return res.status(404).json({ message: "Book not found!" });
    }
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }

  res.book = book;

  next();
}

module.exports = router;
