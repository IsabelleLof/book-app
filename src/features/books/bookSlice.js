// Hämta Böcker med fetch och Async Thunk från Google Books API

// ('books/searchBooks') är namnet på ett action (argument)

// searchTerm är value={searchTerm} i input fältet i BookManager.jsx komponenten

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// exportera const searchBooks

export const searchBooks = createAsyncThunk(
  "books/searchBooks",
  async (searchTerm) => {
    // const apiKey = "AIzaSyBn0sbt4A0Efeb-zYnFuzMVn5wtR6L1jI0"; // Api nykeln från Google Books Api
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${apiKey}`
    );
    const fetchedData = await response.json();
    console.log(fetchedData);
    return fetchedData.items || []; // Returnera böcker eller en tom array om inga böcker finns på det som the user väljer att söka på
  }
);

//console.log(fetchedData);

// Slice för att hantera bokrelaterad state

const bookSlice = createSlice({
  name: "books",
  initialState: {
    searchResults: [], // Lista för sökresultat
    favorites: [], // Lista för addade böcker/favoriter
    status: "idle",
    error: null,
  },
  reducers: {
    addBookToFavorites: (state, action) => {
      state.favorites.push(action.payload); // Lägga till en bok
    },
    removeBookFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter(
        (book) => book.id !== action.payload.id
      ); // Boken som the user vill ta bort är 'inte' equal till action.payload.id - ta bort bok från favos
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchBooks.pending, (state) => {
        state.status = "loading"; // Sätt status till 'loading' när API-anropet pågår
      })
      .addCase(searchBooks.fulfilled, (state, action) => {
        state.searchResults = action.payload; // Sätt sökresultaten i state när anropet lyckas
        state.status = "succeeded"; // Uppdatera status till 'succeeded'
      })
      .addCase(searchBooks.rejected, (state, action) => {
        state.status = "failed"; // Sätt status till 'failed' om anropet misslyckas
        state.error = action.error.message; // Spara felmeddelandet
      });
  },
});

// Exportera actions och reducer så dem kan användas i hela applikationen?

export const { addBookToFavorites, removeBookFromFavorites } =
  bookSlice.actions;
// förstår inte det nedan
export default bookSlice.reducer;
