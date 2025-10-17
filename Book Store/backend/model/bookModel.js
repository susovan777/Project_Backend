import mongoose from "mongoose";

// Defining Schema
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "A book must have a title"],
    unique: true,
    trim: true,
  },
  author: {
    type: String,
    required: [true, "A book must have a author"],
  },
  publishedYear: {
    type: Number,
    required: true,
    min: [1000, "Year must be a four-digit number."],
    max: [new Date().getFullYear(), "Year can not be in the future."],
  },
  price: {
    type: Number,
    required: [true, "A book must have a price."],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// Creating Model
const Book = mongoose.model("Book", bookSchema);

export { Book };
