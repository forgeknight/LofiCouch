import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App";

// Handle GitHub Pages SPA redirect
const redirect = sessionStorage.redirect;
if (redirect) {
  delete sessionStorage.redirect;
  // Could use this to restore route state if needed
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
