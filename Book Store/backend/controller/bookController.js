const getAllBooks = (req, res) => {
  res.status(201).json({
    status: "success",
    // data: {}
  });
};

const getBook = (req, res) => {
  res.status(201).json({
    status: "success",
    // data: {}
  });
};

const addNewBook = (req, res) => {
  res.send("Request sent!");
};

const updateBook = (req, res) => {
  res.send("Request updated!");
};

const deleteBook = (req, res) => {
  res.send("Book deleted!");
};

export { getAllBooks, getBook, addNewBook, updateBook, deleteBook };
