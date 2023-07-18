import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  summary: { type: String, required: true },
  bookUrl: { type: String, required: true },
});

const Book = mongoose.model('Book', bookSchema);

export default Book;