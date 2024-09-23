// Instuderingsövningar:
// Databas och API:
// Övning 1: Skriv en enkel JSON-struktur som representerar en lista över böcker.
// Övning 2: Implementera en funktion som simulerar en CRUD-operation på denna JSON-data.
// Fetch API:
// Övning 1: Skriv en React-komponent som gör en GET-förfrågan till ett offentligt API och loggar resultatet i konsolen.
// Övning 2: Implementera en POST-förfrågan till ett fiktivt API för att spara användardata.

// Förklarande text

// Här är den uppdaterade koden som använder Redux Toolkit 
// för att hantera state med ett centralt objekt, inklusive att 
// lägga till och ta bort böcker från en favoritlista samt hantering 
// av asynkrona anrop med createAsyncThunk för att söka efter böcker.

//import { useState } from "react";
import "./App.css";
import { HelmetProvider } from "react-helmet-async";
//import BookManagerApi from "./BookManagerApi";
//import BookManagerReduxToolkit from "./components/BookManagerReduxToolkit";
import BookManagerReduxToolkit from './components/BookManagerReduxToolkit';


function App() {
  return (
    <HelmetProvider>
      <div>
        <h1>Book App</h1>
        <BookManagerReduxToolkit />
      </div>
    </HelmetProvider>
  );
}

export default App;
