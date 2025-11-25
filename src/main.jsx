import React from "react";
import ReactDOM from "react-dom/client";
// AppProviders envuelve toda la app con los contextos y el Router
import AppProviders from "./providers/AppProviders.jsx";

import "./index.css";
import App from "./App.jsx";// Componente principal de toda la aplicación

// Obtenemos el elemento <div id="root"> del index.html
const root = ReactDOM.createRoot(document.getElementById("root"));

// Renderizamos la app
root.render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>
);
