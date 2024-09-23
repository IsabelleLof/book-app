# Krav för applikationen:
- Redux Store med Redux Toolkit: Skapa och konfigurera en central Redux Store med hjälp av configureStore från Redux Toolkit.
- Slices för Actions och Reducers: Använd Redux Toolkit's createSlice för att definiera både actions och reducers i samma modul. Slicen ska innehålla minst två reducer som påverkar state.
- State Management: Hantera minst ett centralt state-objekt (t.ex. användardata, produktlista, uppgifter) med hjälp av Redux Toolkit.
- Fetch API och Async Thunks: Använd Redux Toolkit's createAsyncThunk för att integrera API-anrop och hantera asynkrona operationer, där data hämtas och lagras i Redux store.
- React-Redux: Använd useSelector och useDispatch för att hämta och uppdatera data från Redux store i dina komponenter.

# Extra funktionalitet (frivilligt):
- Implementera en sökfunktion som hämtar och filtrerar data från ett API och hanterar det via Redux Toolkit.
- Hantera användarens session med autentisering och lagring av användarinformation i Redux Toolkit.
- Skapa en funktion som låter användare redigera och radera data (exempelvis redigera en profil eller radera en uppgift), med Redux Toolkit's slices och CRUD-operationer.




# Pseudo code for implementing the Google Books Api

- Move the Mock data to a JSON file
- Fetch the books from the API

- Change the state management from useState to Global state with Redux Toolkit

# CRUD operations on the books

- add
- delete

# User Auoth

A user kan log in and save his books on his profile page


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
