import React, { useState } from "react";

// The Book Manager component with functions

const BookManager = () => {
  const [books, setBooks] = useState([
    { title: "Sapiens", author: "Yuval Noah Harari", year: 2011 },
    { title: "1984", author: "George Orwell", year: 1949 },
    { title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960 },
  ]);

  //Use useState to add Title, Author and Year to the added books

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");

  //Add function

  const addBook = (newBook) => {
    setBooks([...books, newBook]);
  };

  const deleteBook = (title) => {
    setBooks(books.filter((book) => book.title !== title));
  };

  const updateBook = (title, updatedInfo) => {
    setBooks(
      books.map((book) =>
        book.title === title ? { ...book, ...updatedInfo } : book
      )
    );
  };

  // A Handle Submit function for add/update

  const handleSubmit = (event) => {
    event.preventDefault();

    // use if to have required inputs
    // alert("Please fill in all fields.");
    // return;

      // Check if book already exists for update
      const bookExists = books.some((book) => book.title === title);

      if (bookExists) {
        updateBook(title, { author, year: parseInt(year, 10) });
      } else {
        addBook({ title, author, year: parseInt(year, 10) });
      }
  
      // Clear the form fields after submission
    //   setTitle("");
    //   setAuthor("");
    //   setYear("");

};

  

  return (
    <div>
      <h1>Book Manager</h1>
      {/* Implement a form to add/update books */}
      {/* Value has the value that is the title, that is created in the useState */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
        />
        <input
          type="text"
          placeholder="Year"
          value={year}
          onChange={(event) => setYear(event.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      {/* Map/Render out the books and the other buttons for update and delete */}
      <h2>Book List</h2>
      <ul>
        {books.map((book) => (
          <li key={book.title}>
            {/* The created books and the added books later */}
            {book.title} by {book.author} ({book.year})
            {/* Calling the useStates so you can update/edit */}
            <button
              onClick={() => {
                setTitle(book.title);
                setAuthor(book.author);
                setYear(book.year);
              }}
            >
              Update
            </button>
            <button>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookManager;
