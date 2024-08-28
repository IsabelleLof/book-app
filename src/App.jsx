// Instuderingsövningar:
// Databas och API:
// Övning 1: Skriv en enkel JSON-struktur som representerar en lista över böcker.
// Övning 2: Implementera en funktion som simulerar en CRUD-operation på denna JSON-data.
// Fetch API:
// Övning 1: Skriv en React-komponent som gör en GET-förfrågan till ett offentligt API och loggar resultatet i konsolen.
// Övning 2: Implementera en POST-förfrågan till ett fiktivt API för att spara användardata.

import { useState } from "react";
import "./App.css";
import BookManager from "./Bookmanager";

function App() {
  return (
    <>
      <div>
        <h1>Book App</h1>
        <BookManager />
      </div>
    </>
  );
}

export default App;
