// BookCard komponent skapade men inte använd än.

import React from "react";

const BookCard = ({ book, onAddToFavorites }) => {
  return (
    <div className="book-card">
      <h3>{book.volumeInfo.title}</h3>
      <p>By: {book.volumeInfo.authors?.join(", ") || "Unknown Author"}</p>
      <p>Published: {book.volumeInfo.publishedDate}</p>
      <button onClick={() => onAddToFavorites(book)}>Lägg till Favoriter</button>
    </div>
  );
};

export default BookCard;
