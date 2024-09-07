import React, { useState } from "react";

// Simple Book Search using Google Books API

const BookManager = () => {
  // Google Books API State
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Function to search books using Google Books API
  const searchBooks = async () => {
    if (!searchTerm) return;

    try {
      const apiKey = "SECRET"; // Replace with your Google Books API key
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${apiKey}`
      );
      const data = await response.json();
      setSearchResults(data.items || []); // If no items are returned, set an empty array
    } catch (error) {
      console.error("Error fetching data from Google Books API:", error);
    }
  };

  return (
    <div>
      <h1>Google Books Search</h1>

      {/* Search bar for Google Books */}
      <input
        type="text"
        placeholder="Search for a book"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <button onClick={searchBooks}>Search</button>

      {/* Display search results from Google Books */}
      {searchResults.length > 0 ? (
        <ul>
          {searchResults.map((book) => (
            <li key={book.id}>
              <strong>{book.volumeInfo.title}</strong> by{" "}
              {book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "Unknown Author"} (
              {book.volumeInfo.publishedDate})
            </li>
          ))}
        </ul>
      ) : (
        <p>No books found. Try searching for something else.</p>
      )}
    </div>
  );
};

export default BookManager;


