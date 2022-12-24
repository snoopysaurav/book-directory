import { mongoose } from "mongoose";

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "book name must be provided"],
  },
  author: {
    type: String,
    required: [true, "author name must be provided"],
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  description: {
    type: String,
  },
});

const Book = mongoose.model("Book", bookSchema);
export { Book };
