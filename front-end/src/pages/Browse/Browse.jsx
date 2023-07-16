import React, { useState } from "react";
import styles from "./Browse.module.css";
import Modal from "./Modal";
import FileInputForm from "./FileInputForm";


const booksData = [
  {
    _id: 2,
    title: "Book 1",
    description: "Description of Book 1",
    bookUrl: "https://example.com/book1.pdf",
    image: "/images/book-image.png", // Update with the correct image file path
  },
  {
    title: "Book 2",
    description: "Description of Book 2",
    bookUrl: "https://example.com/book2.pdf",
    image: "/images/book-image.png", // Update with the correct image file path
  },
  {
    title: "Book 2",
    description: "Description of Book 2",
    bookUrl: "https://example.com/book2.pdf",
    image: "/images/book-image.png", // Update with the correct image file path
  },
  {
    title: "Book 2",
    description: "Description of Book 2",
    bookUrl: "https://example.com/book2.pdf",
    image: "/images/book-image.png", // Update with the correct image file path
  },
  {
    title: "Book 2",
    description: "Description of Book 2",
    bookUrl: "https://example.com/book2.pdf",
    image: "/images/book-image.png", // Update with the correct image file path
  },
  {
    title: "Book 2",
    description: "Description of Book 2",
    bookUrl: "https://example.com/book2.pdf",
    image: "/images/book-image.png", // Update with the correct image file path
  },
  {
    title: "Book 2",
    description: "Description of Book 2",
    bookUrl: "https://example.com/book2.pdf",
    image: "/images/book-image.png", // Update with the correct image file path
  },
  {
    title: "Book 2",
    description: "Description of Book 2",
    bookUrl: "https://example.com/book2.pdf",
    image: "/images/book-image.png", // Update with the correct image file path
  },
  {
    title: "Book 2",
    description: "Description of Book 2",
    bookUrl: "https://example.com/book2.pdf",
    image: "/images/book-image.png", // Update with the correct image file path
  },
  {
    title: "Book 2",
    description: "Description of Book 2",
    bookUrl: "https://example.com/book2.pdf",
    image: "/images/book-image.png", // Update with the correct image file path
  },
  {
    title: "Book 2",
    description: "Description of Book 2",
    bookUrl: "https://example.com/book2.pdf",
    image: "/images/book-image.png", // Update with the correct image file path
  },
  {
    title: "Book 2",
    description: "Description of Book 2",
    bookUrl: "https://example.com/book2.pdf",
    image: "/images/book-image.png", // Update with the correct image file path
  },
  {
    title: "Book 2",
    description: "Description of Book 2",
    bookUrl: "http://localhost:3000/download",
    image: "/images/book-image.png", // Update with the correct image file path
  },
  // Add more books here
];


function Browse() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  const [filteredBooks, setFilteredBooks] = useState(booksData);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBookClick = (book) => {
    setSelectedBook(book);
    console.log(book.bookUrl);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    const filtered = booksData.filter((book) =>
      book.title.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredBooks(filtered);
  };

  return (
    <div className={styles.booksContainer}>
      <div>
        <input
          type="text"
          placeholder="Search Books"
          value={searchTerm}
          onChange={handleSearch}
          className={styles.searchBar}
        />
        <FileInputForm></FileInputForm>
      </div>

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          pdfUrl={`${selectedBook?.bookUrl}`}
        />
      )}

      <ul className={styles.bookList}>
        {filteredBooks.length == 0 && "No books found"}
        {filteredBooks.map((book, index) => (
          <li key={index} className={styles.bookItem}>
            <img src={book.image} alt="Book" className={styles.bookImage} />
            <div className={styles.bookDetails}>
              <h3 onClick={() => handleBookClick(book)}>{book.title}</h3>
              <p>{book.description}</p>
              <a href={book.bookUrl} target="_blank" rel="noopener noreferrer">
                Download
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Browse;
