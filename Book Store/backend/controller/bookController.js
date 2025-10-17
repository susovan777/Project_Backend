import { Book } from "../model/bookModel.js";

const getAllBooks = async (req, res) => {
  try {
    const allBooks = await Book.find();

    res.status(200).json({
      status: "success",
      result: allBooks.length,
      data: {
        allBooks,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "Fail",
      messege: err,
    });
  }
};

const getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: {
        book,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "Fail",
      messege: err,
    });
  }
};

const addNewBook = async (req, res) => {
  try {
    const requestBody = req.body;
    const newBook = await Book.create(requestBody);

    res.status(200).json({
      status: "success",
      data: {
        newBook,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "Fail",
      messege: err,
    });
  }
};

const updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        book,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "Fail",
      messege: err,
    });
  }
};

const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: "success",
      data: {
        book,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "Fail",
      messege: err,
    });
  }
};

export { getAllBooks, getBook, addNewBook, updateBook, deleteBook };
