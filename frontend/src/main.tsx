import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Dashboard from "./components/pages/Dashboard";
import { DataProvider } from "./context/DataContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DataProvider>
      <Dashboard />
    </DataProvider>
  </React.StrictMode>
);
