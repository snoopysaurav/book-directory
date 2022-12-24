import { Book } from "../models/books.js";

const getAllBooks = async (req, res) => {
  try {
    const { title } = req.query;
    const queryObject = {};
    if (title) {
      queryObject.title = { $regex: title, $options: "i" };
    }
    let result = Book.find(queryObject);
    const books = await result;
    res.status(200).json({ books });
  } catch (error) {
    console.log(error);
  }
};

const addBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json({ book });
  } catch (error) {
    console.log(error);
  }
};

const getBook = async (req, res) => {
  try {
    const { id: bookID } = req.params;
    const book = await Book.findOne({ _id: bookID });
    res.status(200).json({ book });
  } catch (error) {
    console.log(error);
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id: bookID } = req.params;
    const book = await Book.findOneAndDelete({ _id: bookID });
    res.status(200).json({ book });
  } catch (error) {
    console.log(error);
  }
};
const updateBook = async (req, res) => {
  try {
    const { id: bookID } = req.params;
    const book = await Book.findOneAndUpdate({ _id: bookID }, req.body, {
      new: true,
    });
    res.status(200).json({ book });
  } catch (error) {
    console.log(error);
  }
};

export { getAllBooks, addBook, getBook, deleteBook, updateBook };
