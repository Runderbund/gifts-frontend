import React from "react";
import { createRoot } from 'react-dom/client';
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

// Context Import
import { MemberProvider } from './context/MemberContext';

// Finds the root container element
const container = document.getElementById("root");

// Creates a root
const root = createRoot(container);

// Initial render: Renders the app to the root (in public/index.html)
root.render(
  <React.StrictMode>
    <Router>
      <MemberProvider>
        <App />
      </MemberProvider>
    </Router>
  </React.StrictMode>
);