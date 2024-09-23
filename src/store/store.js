import { configureStore } from '@reduxjs/toolkit';
import bookReducer from '../features/books/bookSlice';
//import bookSlice from '../features/books/bookSlice';

const store = configureStore({
    reducer: {
        books: bookReducer, // Reducern för att hantera böckernas state
    },
});

export default store;