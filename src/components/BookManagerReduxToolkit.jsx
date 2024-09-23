import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet-async";
import { generateSitemap } from "../seo/sitemapGenerator";
import { generateRobotsTxt } from "../seo/robotsGenerator";
import {
  searchBooks,
  addBookToFavorites,
  removeBookFromFavorites,
} from "../features/books/bookSlice";

const BookManagerReduxToolkit = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [popularBooks, setPopularBooks] = useState([]);
  const [loadingPopular, setLoadingPopular] = useState(true);
  const [errorPopular, setErrorPopular] = useState(null);

  const searchResults = useSelector((state) => state.books.searchResults);
  const favorites = useSelector((state) => state.books.favorites);
  const status = useSelector((state) => state.books.status);
  const error = useSelector((state) => state.books.error);

  const dispatch = useDispatch();

  // Anropa searchBooks thunk när användaren klickar på sökknappen
  const handleSearch = () => {
    if (searchTerm) {
      dispatch(searchBooks(searchTerm));
    }
  };

  // Hantera att lägga till bok i favoriter
  const handleAddToFavorites = (book) => {
    dispatch(addBookToFavorites(book));
  };

  // Hantera att ta bort bok från favoriter
  const handleRemoveFromFavorites = (book) => {
    dispatch(removeBookFromFavorites(book));
  };

  // Generera sitemap.xml
  useEffect(() => {
    const req = { protocol: "http", get: () => "localhost:3000" }; // Simulerad req för exempel
    const sitemap = generateSitemap(req);
    console.log("Generated sitemap.xml:\n", sitemap);
  }, []);

  // Generera robots.txt
  useEffect(() => {
    const robotsTxt = generateRobotsTxt();
    console.log(`Generated robots.txt:\n${robotsTxt}`);
  }, []);

  // Hämta populära böcker
  useEffect(() => {
    const fetchPopularBooks = async () => {
      try {
        const response = await fetch("https://www.googleapis.com/books/v1/volumes?q=subject:popular&maxResults=10&key=AIzaSyBn0sbt4A0Efeb-zYnFuzMVn5wtR6L1jI0");
        if (!response.ok) {
          throw new Error("Något gick fel");
        }
        const data = await response.json();
        setPopularBooks(data.items);
      } catch (err) {
        setErrorPopular(err.message);
      } finally {
        setLoadingPopular(false);
      }
    };

    fetchPopularBooks();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Bokhantering - Sök och hantera böcker</title>
        <meta name="description" content="Sök efter böcker och hantera dina favoritböcker." />
        <meta property="og:title" content="Bokhantering" />
        <meta property="og:description" content="Sök efter böcker och hantera dina favoritböcker." />
        <meta property="og:type" content="website" />
      </Helmet>
      <h1>Google Books Search</h1>

      {/* Sökfält för att söka efter böcker */}
      <input
        type="text"
        placeholder="Search for a book"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {/* Visa laddningsstatus eller felmeddelanden */}
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error: {error}</p>}

      {/* Visa sökresultat */}
      <h2>Sökresultat</h2>
      {searchResults.length > 0 ? (
        <ul>
          {searchResults.map((book) => (
            <li key={book.id}>
              <strong>{book.volumeInfo.title}</strong> by{" "}
              {book.volumeInfo.authors?.join(", ") || "Unknown Author"} (
              {book.volumeInfo.publishedDate})
              <button onClick={() => handleAddToFavorites(book)}>
                Lägg till Favoriter
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Inga böcker hittades. Prova att söka något annat.</p>
      )}

      {/* Visa favoritböcker */}
      <h2>Favoritböcker</h2>
      {favorites.length > 0 ? (
        <ul>
          {favorites.map((book) => (
            <li key={book.id}>
              <strong>{book.volumeInfo.title}</strong> by{" "}
              {book.volumeInfo.authors?.join(", ") || "Unknown Author"} (
              {book.volumeInfo.publishedDate})
              <button onClick={() => handleRemoveFromFavorites(book)}>
                Ta bort från Favoriter
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Inga favoriter har lagts till ännu.</p>
      )}

      {/* Visa populära böcker */}
      <h2>Populära Böcker</h2>
      {loadingPopular && <p>Laddar populära böcker...</p>}
      {errorPopular && <p>Fel: {errorPopular}</p>}
      {popularBooks.length > 0 ? (
        <ul>
          {popularBooks.map((book) => (
            <li key={book.id}>
              <strong>{book.volumeInfo.title}</strong> av {book.volumeInfo.authors?.join(", ") || "Okänd författare"}
            </li>
          ))}
        </ul>
      ) : (
        <p>Inga populära böcker hittades.</p>
      )}
    </div>
  );
};

export default BookManagerReduxToolkit;


// Här är den uppdaterade koden som använder Redux Toolkit
// för att hantera state med ett centralt objekt, inklusive att
// lägga till och ta bort böcker från en favoritlista samt hantering
// av asynkrona anrop med createAsyncThunk för att söka efter böcker.

// React komponent för att hantera böcker

// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Helmet } from "react-helmet-async";
// import { generateSitemap } from "../seo/sitemapGenerator";
// import { generateRobotsTxt } from "../seo/robotsGenerator";
// import {
//   searchBooks,
//   addBookToFavorites,
//   removeBookFromFavorites,
// } from "../features/books/bookSlice";

// const BookManagerReduxToolkit = () => {
//   const [searchTerm, setSearchTerm] = useState("");

//   const searchResults = useSelector((state) => state.books.searchResults);
//   const favorites = useSelector((state) => state.books.favorites);
//   const status = useSelector((state) => state.books.status);
//   const error = useSelector((state) => state.books.error);

//   const dispatch = useDispatch();

//   // Anropa searchBooks thunk när användaren klickar på sökknappen
//   const handleSearch = () => {
//     if (searchTerm) {
//       dispatch(searchBooks(searchTerm));
//     }
//   };

//   // Hantera att lägga till bok i favoriter
//   const handleAddToFavorites = (book) => {
//     dispatch(addBookToFavorites(book));
//   };

//   // Hantera att ta bort bok från favoriter
//   const handleRemoveFromFavorites = (book) => {
//     dispatch(removeBookFromFavorites(book));
//   };

//   //console.log(typeof(search));

//   // Generering av sitemap.xml
//   useEffect(() => {
//     const req = { protocol: "http", get: () => "localhost:3000" }; // Simulerad req för exempel
//     const sitemap = generateSitemap(req);
//     console.log("Generated sitemap.xml:\n", sitemap);
//   }, []);

//   // Generering av robots.txt
//   useEffect(() => {
//     const robotsTxt = generateRobotsTxt();
//     console.log(`Generated robots.txt:\n${robotsTxt}`);
//   }, []);

//   return (
//     <div>
//       <Helmet>
//         <title>Bokhantering - Sök och hantera böcker</title>
//         <meta
//           name="description"
//           content="Sök efter böcker och hantera dina favoritböcker."
//         />
//         <meta property="og:title" content="Bokhantering" />
//         <meta
//           property="og:description"
//           content="Sök efter böcker och hantera dina favoritböcker."
//         />
//         <meta property="og:type" content="website" />
//       </Helmet>
//       <h1>Google Books Search</h1>

//       {/* Sökfält för att söka efter böcker */}
//       <input
//         type="text"
//         placeholder="Search for a book"
//         value={searchTerm}
//         onChange={(event) => setSearchTerm(event.target.value)}
//       />
//       <button onClick={handleSearch}>Search</button>

//       {/* Visa laddningsstatus eller felmeddelanden */}
//       {status === "loading" && <p>Loading...</p>}
//       {status === "failed" && <p>Error: {error}</p>}

//       {/* Visa sökresultat */}
//       <h2>Sökresultat</h2>
//       {searchResults.length > 0 ? (
//         <ul>
//           {searchResults.map((book) => (
//             <li key={book.id}>
//               <strong>{book.volumeInfo.title}</strong> by{" "}
//               {book.volumeInfo.authors?.join(", ") || "Unknown Author"} (
//               {book.volumeInfo.publishedDate})
//               <button onClick={() => handleAddToFavorites(book)}>
//                 Lägg till Favoriter
//               </button>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>Inga böcker hittades. Prova att söka något annat.</p>
//       )}

//       {/* Visa favoritböcker */}
//       <h2>Favoritböcker</h2>
//       {favorites.length > 0 ? (
//         <ul>
//           {favorites.map((book) => (
//             <li key={book.id}>
//               <strong>{book.volumeInfo.title}</strong> by{" "}
//               {book.volumeInfo.authors?.join(", ") || "Unknown Author"} (
//               {book.volumeInfo.publishedDate})
//               <button onClick={() => handleRemoveFromFavorites(book)}>
//                 Ta bort från Favoriter
//               </button>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>Inga favoriter har lagts till ännu.</p>
//       )}
//     </div>
//   );
// };

// export default BookManagerReduxToolkit;
