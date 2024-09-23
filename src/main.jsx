import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';  // Importera Provider här
import App from './App.jsx';
import './index.css';
import store from './store/store';  // Importera din Redux store

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>  // Wrappa din app med Provider
      <App />
    </Provider>
  </StrictMode>,
);

