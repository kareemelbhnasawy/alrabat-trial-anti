import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { DataProvider } from "./context/DataContext";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";

const cores = navigator.hardwareConcurrency ?? 8;
const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
if (cores <= 4 || (typeof memory === "number" && memory <= 4)) {
  document.documentElement.classList.add("low-motion");
}

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
