import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { DataProvider } from "./context/DataContext";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("app")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <DataProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </DataProvider>
    </BrowserRouter>
  </React.StrictMode>
);
